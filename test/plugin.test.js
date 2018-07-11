
let App = undefined
let axiosInstance = undefined

beforeAll(() => {

})

afterAll(() => {
    if (App) {
        App.close
    } 
})