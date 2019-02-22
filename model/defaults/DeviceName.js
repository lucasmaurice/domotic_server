module.exports.init = (db) => {
    return new Promise(async (resolve, reject) => {
				
			var device, deviceName;

			device = await db.devices.findOne({
				where: {name: 'projector'}
			})

			deviceName = await db.devicesNames.create({
				text: 'projecteur',
				comment: 'Projector of the Lucas room',
			});
			deviceName.setDevice(device);

			deviceName = await db.devicesNames.create({
				text: 'video projecteur',
				comment: 'Projector of the Lucas room',
			});
			deviceName.setDevice(device);

			resolve();
    });
}
