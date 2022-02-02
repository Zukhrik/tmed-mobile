import React, {useCallback, useEffect, useState} from 'react'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import {CircularProgress} from '@material-ui/core'
import {httpGet} from '../../Service'
import {ImageLazyLoadWrapper} from './style'

export const ImageLazyLoad = ({alt, src, dataSrc, height, showProgress, uploadProgress, hideEffect}) => {
    const [loading, setIsLoading] = useState(true)
    // const [compHeight, setCompHeight] = useState(0)
    const [downloadingProgress, setDownloadingProgress] = useState(undefined)

    // useEffect(() => {
    //     if (src) {
    //         const img = new Image()
    //         img.onload = function () {
    //             // console.log(this.width + 'x' + this.height)
    //             // setCompHeight(this.height)
    //         }
    //         img.src = src
    //     }
    // }, [src])


    const downloadImage = useCallback(() => {
        if (src && !dataSrc) {
            httpGet({
                url: src.substring(19), headers: {hideSuffix: true}, onDownloadProgress: (progressEvent) => {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setDownloadingProgress(percentCompleted)
                }
            }).finally(() => {
                setDownloadingProgress(null)
            })
        }
    }, [src, dataSrc])

    useEffect(() => {
        if (showProgress) {
            downloadImage()
        }
    }, [downloadImage, showProgress])

    return (
        <ImageLazyLoadWrapper>
            {
                showProgress && (
                    <>
                        {
                            !uploadProgress
                                ? downloadingProgress !== null && (
                                <div className='loading-progress'>
                                    <CircularProgress
                                        color='primary'
                                        variant='determinate'
                                        value={downloadingProgress}
                                    />
                                </div>
                            )
                                : (
                                    <div className='loading-progress'>
                                        <CircularProgress
                                            color='primary'
                                            variant='determinate'
                                            value={uploadProgress}
                                        />
                                    </div>
                                )
                        }
                    </>
                )
            }

            <LazyLoadImage
                alt={alt}
                src={src}
                effect={!hideEffect && 'blur'}
                height={loading ? height : undefined}
                afterLoad={() => setIsLoading(false)}
            />
        </ImageLazyLoadWrapper>

    )
}