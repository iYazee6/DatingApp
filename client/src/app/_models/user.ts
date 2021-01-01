export interface User {
    username: string;
    token: string;
}



// Section 9: lesson 100
// We didn't export the interface so it's only used in this typescript file
interface car {
    color: string,
    company: string,
    topspeed?: number // This is an optional property
}

let car1:car = {
    color : 'blue',
    company: 'BMW'
}

let car2:car = {
    color: 'red',
    company: 'TOYOTA',
    topspeed: 100 // if we fill it we must use numbers
}