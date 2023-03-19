import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import GlobalStyle from './utils/styles/GlobalStyle'

import Root from "./routes/root"
import ErrorPage from './pages/Error'

import Worlds, {loader as worldListLoader} from "./pages/Worlds"
import { actionCreateWorld, actionUpdateWorld, actionDeleteWorld, actionExportWorld } from "./pages/World/actions.js"
import World, { loader as worldLoader } from "./pages/World"
import WorldEdit from "./pages/WorldEdit"
import WorldMetadata from './pages/WorldMetadata'
import WorldTheater from "./pages/WorldTheater"
import WorldContext from "./pages/WorldContext"
import WorldData, { loader as worldDataLoader  } from './pages/WorldData'
import ExportWorld from './pages/World/Export'
import DeleteWorld from './pages/World/Delete'

import Person, {loader as personLoader } from './pages/Person'
import {actionCreatePerson, actionUpdatePerson, actionDeletePerson } from './pages/Person/actions'

import Organisation, {loader as organisationLoader } from './pages/Organisation'
import { actionCreateOrganisation, actionUpdateOrganisation, actionDeleteOrganisation } from './pages/Organisation/actions'

import Site, {loader as siteLoader } from './pages/Site'
import {actionCreateSite, actionUpdateSite, actionDeleteSite } from './pages/Site/actions'

import Equipment, {loader as equipmentLoader } from './pages/Equipment'
import { actionCreateEquipment, actionUpdateEquipment, actionDeleteEquipment } from './pages/Equipment/actions'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
          {
            index: true,
            element: <Worlds />,
            loader: worldListLoader,
          },
          {
            path: "worlds",
            element: <Worlds />,
            loader: worldListLoader,
          },
          {
            path: "worlds/create",
            action: actionCreateWorld,
          },
          {
            path: "worlds/:worldId",
            element: <World />,
            loader: worldLoader,
            children : [
              {
                index: true,
                element: <WorldMetadata />,
              },
              {
                path: "metadata",
                element: <WorldMetadata />,
              },
              {
                path: "export",
                element: <ExportWorld />,
                action: actionExportWorld,
              },
              {
                path: "delete",
                element: <DeleteWorld />,
                action: actionDeleteWorld
              },
              {
                path: "theater",
                element: <WorldTheater />,
              },
              {
                path: "context",
                element: <WorldContext />,
              },
              {
                path: "data",
                element: <WorldData />,
                loader: worldDataLoader,
              },
            ]
          },
          {
            path: "worlds/:worldId/edit",
            element: <WorldEdit />,
            loader: worldLoader,
          },
          {
            path: "worlds/:worldId/update/*",
            action: actionUpdateWorld
          },
          {
            path: "worlds/:worldId/data/edit",
            //action: actionUpdateWorldData
          },

          /* People */
          {
            path: "worlds/:worldId/people",
            action: actionCreatePerson
          },
          {
            path: "/people/:personId",
            element: <Person />,
            loader: personLoader,
          },
          {
            path: "/people/:personId/update",
            action: actionUpdatePerson
          },
          {
            path: "/people/:personId/delete",
            action: actionDeletePerson
          },

          /* Organisations */
          {
            path: "worlds/:worldId/organisations",
            action: actionCreateOrganisation
          },
          {
            path: "/organisations/:organisationId",
            element: <Organisation />,
            loader: organisationLoader,
          },
          {
            path: "/organisations/:organisationId/update",
            action: actionUpdateOrganisation
          },
          {
            path: "/organisations/:organisationId/delete",
            action: actionDeleteOrganisation
          },
          {
            path: "worlds/:worldId/organisations",
            action: actionCreateOrganisation
          },

          /* Sites */
          {
            path: "worlds/:worldId/sites",
            action: actionCreateSite
          },
          {
            path: "/sites/:siteId",
            element: <Site />,
            loader: siteLoader,
          },
          {
            path: "/sites/:siteId/update",
            action: actionUpdateSite
          },
          {
            path: "/sites/:siteId/delete",
            action: actionDeleteSite
          },
          

          /* Equipments */
          {
            path: "worlds/:worldId/equipments",
            action: actionCreateEquipment
          },
          {
            path: "/equipments/:equipmentId",
            element: <Equipment />,
            loader: equipmentLoader,
          },
          {
            path: "/equipments/:equipmentId/update",
            action: actionUpdateEquipment
          },
          {
            path: "/equipments/:equipmentId/delete",
            action: actionDeleteEquipment
          },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);