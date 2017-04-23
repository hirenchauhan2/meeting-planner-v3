import {read} from './index'
import {USER_TOKEN, USER_ID} from './constants'

export const token = read(USER_TOKEN) || ''

export const id = read(USER_ID) || ''
