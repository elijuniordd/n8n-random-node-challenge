import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		//requisito não funcional
		icon: 'file:icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '= {{ $parameter["operation"] }}',
		description: 'Consumes the Random.org API to generate true random numbers',
		defaults: {
			name: 'Random',
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
						value: 'generateRandomNumber',
						description: 'Generate a true random number using Random.org API',
						action: 'Generate a true random number',
					},
				],
				default: 'generateRandomNumber',
			},
			// definição dosde inputs
			{
				displayName: 'Minimum Value',
				name: 'min',
				type: 'number',
				default: 1,
				required: true,
				description: 'The minimum value for the random number (inclusive)',
				displayOptions: {
					show: {
						operation: ['generateRandomNumber'],
					},
				},
			},
			{
				displayName: 'Maximum Value',
				name: 'max',
				type: 'number',
				default: 100,
				required: true,
				description: 'The maximum value for the random number (inclusive)',
				displayOptions: {
					show: {
						operation: ['generateRandomNumber'],
					},
				},
			},
		],
	};

	// método execute que contém a lógica principal do nó
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				//boa prática: validações de parâmetros
				const min = this.getNodeParameter('min', i, 1) as number;
				const max = this.getNodeParameter('max', i, 100) as number;
				
					// Validate input parameters
				if (min > max) {
					throw new NodeOperationError(
						this.getNode(),
						'Minimum value cannot be greater than maximum value',
						{ itemIndex: i }
						);
					}

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
						min,
						max,
						timestamp: new Date().toISOString(),
						source: 'random.org',
					},
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error instanceof Error ? error.message : String(error)),
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