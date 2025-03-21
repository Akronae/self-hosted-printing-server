/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PrintIndexImport } from './routes/print/index'
import { Route as LoginIndexImport } from './routes/login/index'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const PrintIndexRoute = PrintIndexImport.update({
  id: '/print/',
  path: '/print/',
  getParentRoute: () => rootRoute,
} as any)

const LoginIndexRoute = LoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/print/': {
      id: '/print/'
      path: '/print'
      fullPath: '/print'
      preLoaderRoute: typeof PrintIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginIndexRoute
  '/print': typeof PrintIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginIndexRoute
  '/print': typeof PrintIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/login/': typeof LoginIndexRoute
  '/print/': typeof PrintIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/login' | '/print'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/login' | '/print'
  id: '__root__' | '/' | '/login/' | '/print/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  LoginIndexRoute: typeof LoginIndexRoute
  PrintIndexRoute: typeof PrintIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  LoginIndexRoute: LoginIndexRoute,
  PrintIndexRoute: PrintIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login/",
        "/print/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/login/": {
      "filePath": "login/index.tsx"
    },
    "/print/": {
      "filePath": "print/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
