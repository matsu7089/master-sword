{
  "frame": {
    "width": 32,
    "height": 32,
    "cols": 6,
    "rows": 2
  },
  "animations" : {
    "walk": {
      "frames": [0, 1, 2, 3, 4, 5],
      "next": "walk",
      "frequency": 8
    },
    "wait": {
      "frames": [6]
    },
    "attack": {
    	"frames": [7, 8, 9, 10],
    	"next": "wait",
    	"frequency": 5
    }
  }
}