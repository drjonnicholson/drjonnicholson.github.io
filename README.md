# www.drjonnicholson.com

Gatsby-based personal and professional website.

## Developing 

Navigate into your new site’s directory and start it up.

```sh
git clone git@github.com:drjonnicholson/drjonnicholson.github.io.git
cd drjonnicholson.github.io/
gatsby develop
```

The site is now running at `http://localhost:8000`!

_Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

### Upgrading to latest version of package dependencies

```sh
npm install -g npm-check-updates  
ncu --deep
ncu -u
```

### FontAwesome

Remember to setup FontAwesome if you haven't already, e.g.

```sh
npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" <API TOKEN>
```


