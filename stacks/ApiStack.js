import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
	//Public reference to the API
	api;

	constructor(scope, id, props) {
		super(scope, id, props);

		const { table } = props;

		// Create the API
		this.api = new sst.Api(this, "Api", {
			defaultFunctionProps: {
				environment: {
					TABLE_NAME: table.tableName,
				},
			},
		    routes: {
				"GET /": "src/lambda.handler",
				"GET /notes": "src/list.main",
				"GET /notes/{id}": "src/get.main",
				"POST   /notes": "src/create.main",
				"PUT   /notes/{id}": "src/update.main",
				"DELETE  /notes/{id}": "src/delete.main",
			},
		});

		// Allow the API to access the table
		this.api.attachPermissions([table]);

		// Show the API endpoint in the output
		this.addOutputs({
			ApiEndpoint: this.api.url,
		});
	}
}