import * as vehicleService from './src/components/vehicles/vehicles.service';
import * as locationService from './src/components/locations/locations.service';
import * as userService from './src/components/users/users.service';
import { MessageType } from './src/models/message.models';
import { User } from './src/models/user.models';

async function initVehicles() {
    const vehicles = await vehicleService.getVehicles();
    if (vehicles.messageType === MessageType.Error) {
        const vehicleResult = await vehicleService.regenerateVehicles();
        if (vehicleResult.messageType === MessageType.Error) {
            throw vehicleResult.message;
        }
    }
}

async function initLocations() {
    const locations = await locationService.getLocations();
    if (locations.messageType === MessageType.Error) {
        const locationResult = await locationService.regenerateLocations();
        const mapResult = await locationService.regenerateMaps();
        if (locationResult.messageType === MessageType.Error) {
            throw locationResult.message;
        }
        if (mapResult.messageType === MessageType.Error) {
            throw mapResult.message;
        }
    }
}

async function initAdmin() {
    const admin: User = {
        name: 'Admin',
        surname: '',
        birthday: new Date(10, 4, 2000),
        email: 'octorix@mail.ru',
        username: 'admin',
        password: 'admin',
        phone: '',
        isAdmin: true
    }
    const users = await userService.getUsers();
    if (users.messageType === MessageType.Error) {
        const adminResult = await userService.addUser(admin);
        if (adminResult.messageType === MessageType.Error) {
            throw adminResult.message;
        }
    }
}

async function initMongo() {
    try {
        await initVehicles()
        await initLocations();
        await initAdmin();
    } catch (err) {
        console.log('Error while initializing entities');
    }
    console.log('Successful initialization');
};

export default initMongo;