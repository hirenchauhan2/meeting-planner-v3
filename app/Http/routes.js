'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.signup')
Route.post('/login', 'UserController.login')
Route.get('/users/me', 'UserController.profile').middleware('auth')
Route.post('/users/me', 'UserController.profile').middleware('auth')
Route.post('/users/me/avatar', 'UserController.updateAvatar').middleware('auth')
Route.post('/meetings', 'MeetingsController.store').middleware('auth')
Route.get('/meetings/:id', 'MeetingsController.show').middleware('auth')
Route.get('/meetings', 'MeetingsController.index').middleware('auth')
Route.any('*', 'NuxtController.render')
