const express = require('express');
const next = require('next');
const compression = require('compression');
const helmet = require('helmet');
const serveStatic = require('serve-static');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();


app.prepare()
    .then(() => {

        const server = express();

        server.use(helmet());
        server.use(compression());
        server.use(serveStatic('static', {'index': ['default.html', 'default.htm']}));

        server.get('/products', (req, res) => {
            app.render(req, res, '/products', req.query);
        });

        server.get('/products/:slug', (req, res) => {
            app.render(req, res, '/product', Object.assign({}, req.params, req.query));
        });

        server.get('/collections/:slug', (req, res) => {
            app.render(req, res, '/collection', Object.assign({}, req.params, req.query));
        });

        //TODO: dynamic route from GraphQL
        server.get('/philosophy', (req, res) => {
            app.render(req, res, '/content',  Object.assign({}, req.params, req.query, {slug: 'philosophy'}));
        });

        server.get('/frames', (req, res) => {
            app.render(req, res, '/content',  Object.assign({}, req.params, req.query, {slug: 'frames'}));
        });

        server.get('/lenses', (req, res) => {
            app.render(req, res, '/content',  Object.assign({}, req.params, req.query, {slug: 'lenses'}));
        });

        server.get('/craftsmanship', (req, res) => {
            app.render(req, res, '/content',  Object.assign({}, req.params, req.query, {slug: 'craftsmanship'}));
        });

        server.get('/grandvision', (req, res) => {
            app.render(req, res, '/legal',  Object.assign({}, req.params, req.query, {slug: 'grandvision'}));
        });

        server.get('/cookie-policy', (req, res) => {
            app.render(req, res, '/legal',  Object.assign({}, req.params, req.query, {slug: 'cookie-policy'}));
        });

        server.get('/privacy-policy', (req, res) => {
            app.render(req, res, '/legal',  Object.assign({}, req.params, req.query, {slug: 'privacy-policy'}));
        });

        server.get('/terms-and-conditions', (req, res) => {
            app.render(req, res, '/legal',  Object.assign({}, req.params, req.query, {slug: 'terms-and-conditions'}));
        });

        server.get('*', (req, res) => {
            return handle(req, res)
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`)
        })
    });