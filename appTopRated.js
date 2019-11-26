// top rated list movies among friends
const users = [
    {
        userId: 15291,
        email: "Constantin_Kuhlman15@yahoo.com",
        friends: [7001, 51417, 62289]
    },
    {
        userId: 7001,
        email: "Keven6@gmail.com",
        friends: [15291, 51417, 62289, 66380]
    },
    {
        userId: 51417,
        email: "Margaretta82@gmail.com",
        friends: [15291, 7001, 9250]
    },
    {
        userId: 62289,
        email: "Marquise.Borer@hotmail.com",
        friends: [15291, 7001]
    }
];

const movies = [
    {
        "title": "The Shawshank Redemption",
        "duration": "PT142M",
        "actors": [
            "Tim Robbins",
            "Morgan Freeman",
            "Bob Gunton"
        ],
        "ratings": [
            {
                "userId": 7001,
                "rating": 8
            },
            {
                "userId": 9250,
                "rating": 9
            },
            {
                "userId": 34139,
                "rating": 8
            }
        ],
        "favorites": [
            66380,
            7001,
            9250,
            34139
        ],
        "watchlist": [
            15291,
            51417,
            62289,
            6146,
            71389,
            93707
        ]
    },
    {
        "title": "The Godfather",
        "duration": "PT175M",
        "actors": [
            "Marlon Brando",
            "Al Pacino",
            "James Caan"
        ],
        "ratings": [
            {
                "userId": 15291,
                "rating": 9
            },
            {
                "userId": 51417,
                "rating": 9
            },
            {
                "userId": 7001,
                "rating": 9
            },
            {
                "userId": 9250,
                "rating": 7
            },
            {
                "userId": 71389,
                "rating": 9
            }
        ],
        "favorites": [
            15291,
            51417,
            7001,
            9250,
            71389,
            93707
        ],
        "watchlist": [
            62289,
            66380,
            34139,
            6146
        ]
    },
    {
        "title": "The Dark Knight",
        "duration": "PT152M",
        "actors": [
            "Christian Bale",
            "Heath Ledger",
            "Aaron Eckhart"
        ],
        "ratings": [
            {
                "userId": 15291,
                "rating": 8
            },
            {
                "userId": 7001,
                "rating": 9
            },
            {
                "userId": 9250,
                "rating": 6
            },
            {
                "userId": 34139,
                "rating": 7
            },
            {
                "userId": 93707,
                "rating": 7
            }
        ],
        "favorites": [
            15291,
            7001,
            9250,
            34139,
            93707
        ],
        "watchlist": [
            51417,
            62289,
            6146,
            71389
        ]
    },
    {
        "title": "Pulp Fiction",
        "duration": "PT154M",
        "actors": [
            "John Travolta",
            "Uma Thurman",
            "Samuel L. Jackson"
        ],
        "ratings": [
            {
                "userId": 62289,
                "rating": 8
            },
            {
                "userId": 66380,
                "rating": 5
            },
            {
                "userId": 6146,
                "rating": 6
            },
            {
                "userId": 71389,
                "rating": 7
            }
        ],
        "favorites": [
            15291,
            51417,
            62289,
            66380,
            71389,
            93707
        ],
        "watchlist": [
            7001,
            9250,
            34139,
            6146
        ]
    }
];

// solution
class MoviesAnalyzer {
    constructor(movies, users) {
        this.movies = movies;
        this.users = users;
    }
    // -- my code
    topRatedMoviesByFriends(userId) {

        const user = this.users.filter(
            user => user.userId === userId
        )[0];
        if (user === undefined) throw 'no such user';

        let moviesFriends = {};
        for (const movie of this.movies) {
            let totalRating = 0;
            let friendsCount = 0;
            for (const friend of user.friends) {
                //  console.log("friend", friend);
                for (const rating of movie.ratings) {
                    //  console.log("userId",userId);
                    if (rating.userId == friend) {
                        totalRating += rating.rating
                        friendsCount++;
                    }
                }
            }

            // console.log(totalRating)
            const averageRating = totalRating / friendsCount
            if (moviesFriends[averageRating]) {
                moviesFriends[averageRating].push(movie.title);
            } else if (averageRating > 0) {
                moviesFriends[averageRating] = [movie.title];
            }
        }
        // console.log(moviesFriends)
        return moviesFriends;
    }

    topRatedMoviesAmongFriends(userId) {

        const friendsTopRatedlist = this.topRatedMoviesByFriends(userId);
        let topMovies = [];
        const sortedKeys = Object.keys(friendsTopRatedlist).sort(this.compareRating);
        //console.log(sortedKeys)
        for (const key of sortedKeys) {
            let sortedTitles = friendsTopRatedlist[key].sort();
            while (sortedTitles.length > 0 && topMovies.length < 3) {
                topMovies.push(sortedTitles.shift());
            }
        }
        return topMovies;
    }

    compareRating(a, b) {
        const fa = parseFloat(a)
        const fb = parseFloat(b)

        if (fa < fb) return 1
        else if (fa > fb) return -1
        else return 0
    }


}

// test
const analyzer = new MoviesAnalyzer(movies, users);
console.log(analyzer.topRatedMoviesAmongFriends(62289));