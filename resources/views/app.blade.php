<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
            rel="shortcut icon"
            href="{{ asset('/assets/images/logobg.png') }}"
        />
        @vite('resources/css/app.css') @viteReactRefresh
        @vite('resources/js/app.jsx') @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
