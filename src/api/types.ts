export type ReturnObject = {
    name: string;
    lat: number;
    lon: number;
    state: string;
    country: string;
}
// export type WeatherData = {
//     weather: {
//         id: number;
//         main: string;
//         description: string;
//         icon: string;
//     };
//     main: {
//         temp: number;
//         feels_like: number;
//         temp_min: number;
//         temp_max: number;
//         presure: number;
//         humidity: number;
//     };
//     wind: {
//         speed: number;
//         deg: number;
//     };
//     name: string;
// }

// export type ExtendedForecastData = {
//     day: string;
//     temp: {
//         temp_min: number;
//         temp_max: number;
//     };
//     weather: {
//         id: number;
//         main: string;
//     };
// }

export type ForecastType = {
    name: string
    country: string
    list: [
        {
        dt: number
        main: {
            feels_like: number
            humidity: number
            pressure: number
            temp: number
            temp_max: number
            temp_min: number
        }
    weather:[
        {
        main: string
        icon: string
        description: string
    }]
    }]
}