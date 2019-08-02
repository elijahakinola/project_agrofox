<!DOCTYPE html>
<html lang="en">
<head>


    <title>Lilycourt</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    
    <div id="app">
        <v-app>
          <app-start></app-start>
        </v-app>  
    </div>

    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>