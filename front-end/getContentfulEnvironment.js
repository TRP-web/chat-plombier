const contentfulManagement = require("contentful-management")

const CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN = "CFPAT-70gHrNx3sc95YmDwuaLBnpOWJCBk9Wovqh_xF3CI5Rs"
const CONTENTFUL_SPACE_ID = "gu8txoix5hr4"
const CONTENTFUL_ENVIRONMENT = "master"

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  })

  return contentfulClient
    .getSpace(CONTENTFUL_SPACE_ID)
    .then(space => space.getEnvironment(CONTENTFUL_ENVIRONMENT))
}