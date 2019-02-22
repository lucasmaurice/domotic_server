module.exports.init = (db) => {
    return new Promise(async (resolve, reject) => {
		var action;
	
		await db.methods.create({
			name: 'api-post',
			comment: 'api call to the device, with post method',
		});

		await db.methods.create({
			name: 'api-get',
			comment: 'api call to the device, with get method',
		});

		resolve();
    });
}
