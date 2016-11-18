import React from "react"
import ReactDOM from "react-dom"

export default class LightsOut extends React.Component {
	constructor(props) {
		super(props)
		var grid = [[0, 1, 0, 1, 0], [0, 1, 0, 1, 1], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0], [1, 1, 1, 0, 0]]
		this.state = {grid}
		this.cellClick = this.cellClick.bind(this)
	}

	flip(grid, r, c) {
		if (r >= 0 && r < grid.length) {
			if (c >= 0 && r < grid[r].length) {
				grid[r][c] = grid[r][c] * -1 + 1
			}
		}
		return grid
	}

	cellClick(e) {
		var id = e.target.id
		var arr = id.split("c")
		console.log(arr)
		var r = parseInt(arr[1])
		var c = parseInt(arr[2])
		console.log([r, c])
		var grid = this.state.grid
		grid = this.flip(grid, r, c)
		grid = this.flip(grid, r, c+1)
		grid = this.flip(grid, r, c-1)
		grid = this.flip(grid, r+1, c)
		grid = this.flip(grid, r-1, c)
		this.setState({grid})
	}
	
	render() {
		var grid = this.state.grid
		var n = grid[0].length
		var arr = []
		for (var i=0; i < n; i++) {
			arr.push(i)
		}
		var me = this
		return (
			<div class="center">
				<h2>Lights Out!</h2>
				<p>Click on the squares below to turn off adjacent lights.  Turn off all the lights to win!</p>
				<div class="lights-out">
					{arr.map(function(r) {
						return (
							<div class="lo-row">
								{arr.map(function(c) {
									var isActive = grid[r][c]
							        var className = isActive > 0 ? "lo-cell lo-cell-active" : "lo-cell lo-cell-inactive"
									var id = "c" + r + "c" + c
									return <div id={id} key={id} class={className} onClick={me.cellClick.bind(this)}></div>
								})}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}
