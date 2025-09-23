import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random.org',
		name: 'random',
		//requisito não funcional
		icon: 'file:icone.svg', 
		group: ['transform'],
		version: 1,
		subtitle: '= {{ $parameter["operation"] }}',
		description: 'Consumes the Random.org API to generate true random numbers',
		defaults: {
			name: 'Random.org',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator',
						value: 'generate',
						description: 'Generate a true random integer',
						action: 'Generate a true random integer',
					},
				],
				default: 'generate',
			},
			// definição dosde inputs
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 1,
				required: true,
				displayOptions: {
					show: {
						operation: ['generate'],
					},
				},
				description: 'The minimum integer value (inclusive)', 
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 100,
				required: true,
				displayOptions: {
					show: {
						operation: ['generate'],
					},
				},
				description: 'The maximum integer value (inclusive)', 
			},
		],
	};

	// método execute que contém a lógica principal do nó
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const min = this.getNodeParameter('min', i, 1) as number;
				const max = this.getNodeParameter('max', i, 100) as number;

				// utilizando api pública disponível no email
				const apiUrl = `https://www.random.org/integers/?num=1&min=1&max=60&col=1&base=10&format=plain&rnd=new`;

				const response = await this.helpers.httpRequest({
					method: 'GET',
					url: apiUrl,
					json: false,
				});

				const randomNumber = parseInt(response as string, 10);

				returnData.push({
					json: {
						randomNumber,
					},
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: { item: i },
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}