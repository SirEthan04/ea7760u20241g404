
# Tesla Supercharger Fleet & Battery Storage Platform

## Description

Tesla Supercharger Fleet & Battery Storage Platform is a web application developed with Angular for managing Tesla supercharger fleet and battery storage operations.

The application allows users to visualize charging stations, monitor energy consumption, calculate available capacity, and register new charging sessions.

## Technologies

- Angular 22
- TypeScript
- Angular Material
- Angular Signals
- Angular Reactive Forms
- RxJS
- ngx-translate
- JSON Server 0.17.4
- Open Brewery DB API

## Features

- Display charging stations.
- View charging sessions associated with each station.
- Calculate total energy consumption.
- Calculate available charging capacity.
- Register new charging sessions.
- Validate charging sessions against available station capacity.
- Retrieve brewery information from the Open Brewery DB API.
- Switch between English and Spanish.
- Navigate using a responsive sidebar.
- Display a custom page-not-found view.

## Architecture

The application follows a Domain-Driven Design-inspired architecture.

### Bounded Contexts

**Dispatches**

Responsible for managing dispatch hubs, dispatch orders, and tonnage validation.

**Breweries**

Responsible for retrieving brewery information from the external Open Brewery DB API.

**Shared**

Contains reusable components such as the header, sidebar, footer, and page-not-found view.

### Architectural Patterns

- Entity
- Resource
- Assembler
- Request
- Service
- API
- Endpoint
- Store

Angular Signals are used for reactive state management.

## Installation

Install project dependencies:

```bash
npm install
```

## Running the Mock API

Start JSON Server:

```bash
npx json-server --watch server/db.json --port 3000
```

The mock API will be available at:

- http://localhost:3000/charging-stations
- http://localhost:3000/vehicle-charges

## Running the Angular Application

Open a second terminal and execute:

```bash
npx ng serve -o
```

The application will be available at:

http://localhost:4200

## Application Routes

| Route | Description |
|---|---|
| `/home` | Displays charging stations and orders |
| `/charges/new` | Registers a new charging session |
| Other routes | Displays the page-not-found view |

## External API

The application uses Open Brewery DB to retrieve breweries by type.

API documentation:

https://vpic.nhtsa.dot.gov/api/

## Internationalization

The application supports:

- English (default)
- Spanish

Translation resources are located in:

- `public/i18n/en.json`
- `public/i18n/es.json`

## Authorship

Developed by Mateo Caldas Bravo

Academic practice project.
