module.exports.init = (db) => {
    return new Promise(async (resolve, reject) => {
		on = await db.actions.create({
			name: 'on',
			comment: 'Switch on the related device.',
		});

		off = await db.actions.create({
			name: 'off',
			comment: 'Switch off the related device.',
		});

		open = await db.actions.create({
			name: 'open',
			comment: 'Open the related device.',
		});

		close = await db.actions.create({
			name: 'close',
			comment: 'Close the related device.',
		});

		device = await db.devices.findOne({
			where: {name: 'projector'}
		})

		apiPost = await db.methods.create({
			name: 'api-post',
			comment: 'api call to the device, with post method',
		});

		apiGet = await db.methods.create({
			name: 'api-get',
			comment: 'api call to the device, with get method',
		});

		device.addActions(on, { through: { methodId: apiGet.id, command: "http://192.168.1.41/scripts/IsapiExtPj.dll?D=%05%02%00%00%00%00" }});
		device.addActions(off, { through: { methodId: apiGet.id, command: "http://192.168.1.41/scripts/IsapiExtPj.dll?D=%05%02%01%00%00%00" }});

		resolve();
    });
}
