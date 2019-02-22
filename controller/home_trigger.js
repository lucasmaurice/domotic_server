const db = require('../model/sql_access.js');

exports.list = async (req, res) => {
    if(req != null && req.token != null){
        try{
            session = await users.isConnected(req);
			if(session && (session.role.level == 1 || session.role.level == 2)){
                const listRoles = await db.roles.findAll({attributes: ['id', 'name', 'level']});
                res.send(JSON.stringify({"success": true, "error": null, "data": listRoles}));
                res.status(200);
                return;
            } else {
				res.send(JSON.stringify({"success": false, "error": "access_denied", "data": null}));
                res.status(401);
                return;
			}
        } catch (error) {
            res.send(JSON.stringify({"success": false, "error": "server_error", "data": null}));
            res.status(500);
        }
    } else {
        res.send(JSON.stringify({ "success": false, "error": "bad_request", "data": null }));
        res.status(400);
    }
}