module.exports = function(){
	var fixtures = {
		find: function(type, ids){
			var records = this[type];
			if(Array.isArray(ids)){
				return records.filter(function(value){
					return ids.indexOf(value.id) != -1;
				});
			}
			else{
				var result = records.filter(function(value){
					return value.id == ids;
				});
				if(result.length){
					return result[0];
				}
			}
		},

		create: function(type, data){
			console.log(data);
			var records = this[type];
			var maxId = records.reduce(function(prev, curr){
				return Math.max(prev, curr.id);
			}, 1);

			data.id = maxId + 1;
			console.log(data);
			records.push(data);

			return data;
		},


		users: [
			{
				"id": 1,
				"email": "example@example.com"
			}
		],
		
		puzzles: [
			{
				"id": 1,
				"name": "3x3x3",
				"slug": "3x3x3",
				"solve_method_ids": [1, 2, 3]
			}
		],

		solveMethods: [
			{
				"id": 1,
				"puzzle_id": 1,
				"name": "No Breakdown",
				"step_ids": [
					9 // Full Solve
				]
			},
			{
				"id": 2,
				"puzzle_id": 1,
				"name": "CFOP",
				"step_ids": [
					1,	// Cross
					2,	// F2L
					3,	// OLL
					4	// PLL
				]
			},
			{
				"id": 3,
				"puzzle_id": 1,
				"name": "Roux",
				"step_ids": [
					5,	//	F2B-1
					6,	//	F2B-2
					7,	//	CMLL
					8	// L6E
				]
			},
		],

		steps: [
			{
				"id": 1,
				"name": "Cross",
				"description": "Orient and permute the edges on one face."
			},
			{
				"id": 2,
				"name": "F2L",
				"description": "Insert corner/edge pairs with a completed cross to complete the first two layers."
			},
			{
				"id": 3,
				"name": "OLL",
				"description": "Orient last layer pieces to make a solid colored face."
			},
			{
				"id": 4,
				"name": "PLL",
				"description": "Permute last layer pieces after orientation to solve the layer."
			},
			{
				"id": 5,
				"name": "F2B-1",
				"description": "Solve a 1x2x3 block on one side."
			},
			{
				"id": 6,
				"name": "F2B-2",
				"description": "Solve a 1x2x3 block opposite the first 1x2x3 block."
			},
			{
				"id": 7,
				"name": "CMLL",
				"description": "Solve last layer corners without regard to the M slice."
			},
			{
				"id": 8,
				"name": "L6E",
				"description": "Solve last layer and DF and DB edges."
			},
			{
				"id": 9,
				"name": "Full Solve",
				"description": "Freestyle start to finish."
			}
		],

		solves: [
			{
				"id": 1,
				"scramble": "L D' L2 U' R2 B D2 F2 U' F' B' L' U' B D' B' D2 U F' L' D L2 B2 D2 B'",
				"stepResults": [1, 2, 3, 4],
				"solveMethod": 3,
				"user": 1
			},
			{
				"id": 2,
				"scramble": "D' F' B' U F R2 F2 U' D F R' D' R F2 R' D' F' L R2 F' L2 B2 U' R2 B'",
				"stepResults": [5, 6, 7, 8],
				"solveMethod": 3,
				"user": 1
			},
			{
				"id": 3,
				"scramble": "D U' R B' L2 U' D L' U' D L2 B2 L' U' D R' F' L D2 F2 D2 R' U R' L",
				"stepResults": [9, 10, 11, 12],
				"solveMethod": 3,
				"user": 1
			}
		],

		stepResults: [
			{
				"id": 1,
				"solve": 1,
				"step": 5,
				"time": 5000
			},
			{
				"id": 2,
				"solve": 1,
				"step": 6,
				"time": 10000
			},
			{
				"id": 3,
				"solve": 1,
				"step": 7,
				"time": 4000
			},
			{
				"id": 4,
				"solve": 1,
				"step": 8,
				"time": 7000
			},
			{
				"id": 5,
				"solve": 2,
				"step": 5,
				"time": 5500
			},
			{
				"id": 6,
				"solve": 2,
				"step": 6,
				"time": 9500
			},
			{
				"id": 7,
				"solve": 2,
				"step": 7,
				"time": 4500
			},
			{
				"id": 8,
				"solve": 2,
				"step": 8,
				"time": 6500
			},
			{
				"id": 9,
				"solve": 3,
				"step": 5,
				"time": 2500
			},
			{
				"id": 10,
				"solve": 3,
				"step": 6,
				"time": 6500
			},
			{
				"id": 11,
				"solve": 3,
				"step": 7,
				"time": 3500
			},
			{
				"id": 12,
				"solve": 3,
				"step": 8,
				"time": 5500
			}
		]
	};
	return fixtures;
};