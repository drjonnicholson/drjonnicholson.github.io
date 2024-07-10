'use strict'

const axios = require('axios')
const { createRemoteFileNode } = require('gatsby-source-filesystem')
const utils = require('./utils')

const NODE_TYPE = 'Badge'
const makeUrl = (user) => `https://www.credly.com/users/${user}/badges.json`

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    users: Joi.array()
      .required()
      .default([])
      .description(
        'The usernames for Credly accounts to pull data for, e.g. https://www.credly.com/users/{user}/badges.json',
      )
      .external(async (opt) => {
        if (!opt || opt.length === 0) {
          console.warn('No Credly users to fetch data for')
        } else {
          for (const user of opt) {
            try {
              const response = await axios.head(makeUrl(user))
              if (response.status !== 200) {
                throw new Error(
                  `Cannot retrieve the badges JSON for user '${user}' (${response.status}). Correct the user and try again!`,
                )
              }
            } catch (err) {
              throw new Error(`Unexpected error trying to retrieve badge JSON for user '${user}' (${err})`)
            }
          }
        }
      }),
  })
}

exports.sourceNodes = async ({ actions, createContentDigest }, pluginOptions) => {
  const { createNode } = actions

  const getBadges = async (user) => {
    try {
      const response = await axios.get(makeUrl(user))
      if (response.status == 200) {
        const rawData = response.data?.data
        const data = utils.camelize(rawData ?? {})
        return data
      }
    } catch (error) {
      console.error(error)
    }
    console.error(`Could not retrieve data for user ${user}`)
    return []
  }

  if (!pluginOptions.users || pluginOptions.users.length === 0) {
    return
  }

  for (const user of pluginOptions.users) {
    const badges = await getBadges(user)

    for (const badge of badges) {
      badge.user = user

      await createNode({
        ...badge,
        parent: null,
        children: [],
        internal: {
          type: NODE_TYPE,
          content: JSON.stringify(badge),
          contentDigest: createContentDigest(badge),
        },
      })
    }
  }
}

exports.onCreateNode = async ({ node, actions: { createNode }, createNodeId, getCache }) => {
  const makeImageFile = async (remoteImage, obj, prop) => {
    if (!remoteImage || !obj || !prop) {
      return
    }

    const fileNode = await createRemoteFileNode({
      url: remoteImage,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    })

    if (fileNode) {
      obj[prop] = fileNode.id
    }
  }

  switch (node.internal.type) {
    case NODE_TYPE:
      await makeImageFile(node.earnerPhotoUrl, node, 'earnerPhotoFile___NODE')
      await makeImageFile(node.imageUrl, node, 'imageFile___NODE')
      await makeImageFile(node.badgeTemplate?.imageUrl, node.badgeTemplate, 'imageFile___NODE')
      for (const endorsement of node.badgeTemplate?.endorsements) {
        await makeImageFile(endorsement.endorser?.imageUrl, endorsement.endorser, 'imageFile___NODE')
      }
      break
  }
}
