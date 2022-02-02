import {PERMISSIONS} from '../../Constants';

export const getAccountInfo = (data, slug_name) => ({
  slug_name,
  type: 'user',
  avatar: data.avatar,
  region: data.region,
  status: data.status,
  url: `/@${slug_name}`,
  currency: data.currency,
  category: data.main_cat,
  perms: [PERMISSIONS.GRAND],
  isOfficial: data.is_official,
  name: `${data.lastname} ${data.name}`,
})

export const getLinkedUsers = (data) => {
  const tmp = []
  if (data) {
    for (let user of data) {
      tmp.push({
        type: 'user',
        region: user.region,
        avatar: user.avatar,
        status: user.status,
        name: user.full_name,
        category: user.main_cat,
        currency: user.currency,
        slug_name: user.username,
        isOfficial: user.is_official,
        url: `/@${user.username}`,
        perms: [PERMISSIONS.GRAND],
      })
    }
  }
  return tmp
}

export const getSpecOrganizations = (data, accountInfo) => {
  const tmp = []

  if (data) {
    const orgSpecs = data.filter(item => item.perms.length > 0)
    for (let orgSpec of orgSpecs) {
      tmp.push({
        type: 'organization',
        name: orgSpec.org.name,
        avatar: orgSpec.org.logo,
        region: orgSpec.org.region,
        status: orgSpec.org.status,
        category: orgSpec.org.category,
        currency: orgSpec.org.currency,
        url: `/${orgSpec.org.slug_name}`,
        slug_name: orgSpec.org.slug_name,
        isOfficial: orgSpec.org.is_official,
        perms: orgSpec.perms.map(item => item.permission),
      })
    }
  }

  return tmp
}

export const getOrganizations = (data, accountInfo) => {
  const tmp = []
  if (data) {
    const organizations = data.filter(item => item.status === 5)
    for (let org of organizations) {
      tmp.push({
        name: org.name,
        avatar: org.logo,
        region: org.region,
        status: org.status,
        type: 'organization',
        category: org.category,
        url: `/${org.slug_name}`,
        slug_name: org.slug_name,
        perms: [PERMISSIONS.GRAND],
        isOfficial: org.is_official,
        currency: accountInfo.currency,
      })
    }
  }
  return tmp
}

export const getSpecialisms = (data, slug_name) => {
  const tmp = []
  if (data) {
    for (let spec of data) {
      tmp.push({
        id: spec.id,
        name: spec.org.name,
        url: `/@${slug_name}`,
        avatar: spec.org.logo,
        category: spec.job.name,
      })
    }
  }

  return tmp
}

export const getUpdated = (data, slug_name, newData) => {
  const idx = data.findIndex(item => item.slug_name === slug_name)
  const item = data.find(item => item.slug_name === slug_name)

  return [...data.slice(0, idx), {...item, ...newData}, ...data.slice(idx + 1)]
}
