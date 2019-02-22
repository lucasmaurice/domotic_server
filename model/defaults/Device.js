module.exports.init = (db) => {
    return new Promise(async (resolve, reject) => {
	
		await db.devices.create({
			name: 'projector',
			comment: 'Projector of the Lucas room',
		});

		await db.devices.create({
			name: 'door',
			comment: 'Open the main entrance door',
		});

		resolve();
    });
}
