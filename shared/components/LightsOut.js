import React from 'react'
import ReactDOM from 'react-dom'

export default class LightsOut extends React.Component {
  constructor(props) {
    super(props)
    var grid = [
      [0, 0, 1, 1, 1],
      [0, 0, 1, 1, 1],
      [1, 1, 0, 0, 0],
      [0, 1, 0, 1, 1],
      [0, 0, 1, 0, 0]
    ]
    this.state = {
      grid,
      won: false
    }
    this.cellClick = this.cellClick.bind(this)
  }

  flip(grid, r, c) {
    var n = grid.length
    if (r >= 0 && r < n) {
      if (c >= 0 && c < n) {
        grid[r][c] = grid[r][c] * -1 + 1
      }
    }
    return grid
  }
  check_win() {
    var grid = this.state.grid
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        if (grid[i][j] > 0) {
          return false
        }
      }
    }
    return true
  }

  cellClick(e) {
    var id = e.target.id
    var arr = id.split('c')
    var r = parseInt(arr[1])
    var c = parseInt(arr[2])
    var grid = this.state.grid
    grid = this.flip(grid, r, c)
    grid = this.flip(grid, r, c + 1)
    grid = this.flip(grid, r, c - 1)
    grid = this.flip(grid, r + 1, c)
    grid = this.flip(grid, r - 1, c)
    var won = this.check_win()
    this.setState({ grid, won })
  }

  render() {
    var grid = this.state.grid
    var n = grid[0].length
    var arr = []
    for (var i = 0; i < n; i++) {
      arr.push(i)
    }
    var me = this
    if (!this.state.won) {
      return (
        <div className="center">
          <div className="lights-out">
            {arr.map(function(r) {
              return (
                <div className="lo-row">
                  {arr.map(function(c) {
                    var isActive = grid[r][c]
                    var className =
                      isActive > 0
                        ? 'lo-cell lo-cell-active'
                        : 'lo-cell lo-cell-inactive'
                    var id = 'c' + r + 'c' + c
                    return (
                      <div
                        id={id}
                        key={id}
                        className={className}
                        onClick={me.cellClick.bind(this)}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
          <p>
            Click on the squares below to turn off adjacent lights. Turn off all
            the lights to win!
          </p>
        </div>
      )
    } else {
      return (
        <div className="center">
          <div className="lo-container">
            <div className="lo-congrats">
              <p>Congratulations, you've won the game!!!</p>
            </div>
          </div>
        </div>
      )
    }
  }
}
