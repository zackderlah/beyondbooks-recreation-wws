# Beyond Books recreation

## Platform

web

## Stack

Astro + TypeScript + Tailwind. Static build for WWS import, as required by the recreation pipeline.

## Purpose

Faithfully recreate the existing Beyond Books Qld website at https://www.beyondbooks.net.au/ for migration into WWS. All seven existing routes, original copy, assets, typography, spacing, responsive behavior and meaningful interactions are the brief. No redesign.

## Content and integration boundaries

Layout belongs in components and CSS. Editable text, images, links, contact details and SEO belong in src/cms/content.json → pageContent. The user confirmed this pipeline's structure as the import contract. The WebWave form receiver must be replaced with a WWS-owned endpoint at import.
