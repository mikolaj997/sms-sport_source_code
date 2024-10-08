//https://hr.uky.edu/wellness/exercise-calories-burned-hour
const CalorieBurnData = {
    "Aerobics, general": [384, 457, 531, 605],
    "Aerobics, high impact": [413, 493, 572, 651],
    "Aerobics, low impact": [295, 352, 409, 465],
    "Aerobics, step aerobics": [502, 598, 695, 791],
    "Archery": [207, 246, 286, 326],
    "Backpacking, Hiking with pack": [413, 493, 572, 651],
    "Badminton": [266, 317, 368, 419],
    "Bagging grass, leaves": [236, 281, 327, 372],
    "Bakery, light effort": [148, 176, 204, 233],
    "Ballet, twist, jazz, tap": [266, 317, 368, 419],
    "Ballroom dancing, fast": [325, 387, 449, 512],
    "Ballroom dancing, slow": [177, 211, 245, 279],
    "Basketball game, competitive": [472, 563, 654, 745],
    "Basketball, playing, non-game": [354, 422, 490, 558],
    "Basketball, shooting baskets": [266, 317, 368, 419],
    "Basketball, wheelchair": [384, 457, 531, 605],
    "Bathing dog": [207, 246, 286, 326],
    "Bird watching": [148, 176, 204, 233],
    "Boating, power, speed boat": [148, 176, 204, 233],
    "Bowling": [177, 211, 245, 279],
    "Boxing, in ring": [708, 844, 981, 1117],
    "Boxing, punching bag": [354, 422, 490, 558],
    "Boxing, sparring": [531, 633, 735, 838],
    "Calisthenics, light, pushups, sit-ups…": [207, 246, 286, 326],
    "Calisthenics, fast, pushups, sit-ups…": [472, 563, 654, 745],
    "Canoeing, camping trip": [236, 281, 327, 372],
    "Canoeing, rowing, light": [177, 211, 245, 279],
    "Canoeing, rowing, moderate": [413, 493, 572, 651],
    "Canoeing, rowing, vigorous": [708, 844, 981, 1117],
    "Carpentry, general": [207, 246, 286, 326],
    "Carrying 16 to 24 lbs, upstairs": [354, 422, 490, 558],
    "Carrying 25 to 49 lbs, upstairs": [472, 563, 654, 745],
    "Carrying heavy loads": [472, 563, 654, 745],
    "Carrying infant, level ground": [207, 246, 286, 326],
    "Carrying infant, upstairs": [295, 352, 409, 465],
    "Carrying moderate loads upstairs": [472, 563, 654, 745],
    "Carrying small children": [177, 211, 245, 279],
    "Children's games, hopscotch...": [295, 352, 409, 465],
    "Circuit training, minimal rest": [472, 563, 654, 745],
    "Cleaning gutters": [295, 352, 409, 465],
    "Cleaning, dusting": [148, 176, 204, 233],
    "Climbing hills, carrying up to 9 lbs": [413, 493, 572, 651],
    "Climbing hills, carrying 10 to 20 lb": [443, 528, 613, 698],
    "Climbing hills, carrying 21 to 42 lb": [472, 563, 654, 745],
    "Climbing hills, carrying over 42 lb": [531, 633, 735, 838],
    "Coaching: football, basketball, soccer": [236, 281, 327, 372],
    "Coal mining, general": [354, 422, 490, 558],
    "Construction, exterior, remodeling": [325, 387, 449, 512],
    "Crew, sculling, rowing, competition": [708, 844, 981, 1117],
    "Cricket (batting, bowling)": [295, 352, 409, 465],
    "Croquet": [148, 176, 204, 233],
    "Cross country snow skiing, slow": [413, 493, 572, 651],
    "Cross country skiing, moderate": [472, 563, 654, 745],
    "Cross country skiing, racing": [826, 985, 1144, 1303],
    "Cross country skiing, uphill": [974, 1161, 1348, 1536],
    "Cross country skiing, vigorous": [531, 633, 735, 838],
    "Curling": [236, 281, 327, 372],
    "Cycling, <10mph, leisure bicycling": [236, 281, 327, 372],
    "Cycling, >20mph, racing": [944, 1126, 1308, 1489],
    "Cycling, 10-11.9mph, light": [354, 422, 490, 558],
    "Cycling, 12-13.9mph, moderate": [472, 563, 654, 745],
    "Cycling, 14-15.9mph, vigorous": [590, 704, 817, 931],
    "Cycling, 16-19mph, very fast, racing": [708, 844, 981, 1117],
    "Cycling, mountain bike, bmx": [502, 598, 695, 791],
    "Fishing, ice fishing": [118, 141, 165, 189],
    "Flying airplane (pilot)": [118, 141, 165, 189],
    "Football or baseball, playing catch": [148, 177, 207, 236],
    "Football, competitive": [531, 633, 735, 837],
    "Football, touch, flag, general": [472, 562, 651, 741],
    "Forestry, ax chopping, fast": [1003, 1196, 1389, 1582],
    "Forestry, ax chopping, slow": [295, 354, 413, 472],
    "Forestry, carrying logs": [649, 773, 897, 1021],
    "Forestry, sawing by hand": [413, 493, 572, 651],
    "Forestry, trimming trees": [531, 633, 735, 837],
    "Frisbee playing, general": [177, 211, 246, 281],
    "Frisbee, ultimate Frisbee": [472, 562, 651, 741],
    "Gardening, general": [236, 281, 327, 372],
    "General cleaning": [207, 246, 286, 325],
    "Golf, driving range": [177, 211, 246, 281],
    "Golf, general": [266, 317, 368, 419],
    "Golf, miniature golf": [177, 211, 246, 281],
    "Golf, using power cart": [207, 246, 286, 325],
    "Golf, walking and pulling clubs": [254, 303, 352, 401],
    "Golf, walking and carrying clubs": [266, 317, 368, 419],
    "Gymnastics": [236, 281, 327, 372],
    "Hacky sack": [236, 281, 327, 372],
    "Handball": [708, 844, 981, 1117],
    "Handball, team": [472, 562, 651, 741],
    "Health club exercise": [325, 387, 448, 510],
    "Hiking, cross country": [354, 422, 490, 559],
    "Hockey, field hockey": [472, 562, 651, 741],
    "Hockey, ice hockey": [472, 562, 651, 741],
    "Horseback riding, saddling horse": [207, 246, 286, 325],
    "Horse grooming": [354, 422, 490, 559],
    "Horse racing, galloping": [472, 562, 651, 741],
    "Horse racing, trotting": [384, 457, 531, 605],
    "Horse racing, walking": [153, 183, 213, 243],
    "Horseback riding": [236, 281, 327, 372],
    "Horseback riding, grooming horse": [207, 246, 286, 325],
    "Horseback riding, trotting": [384, 457, 531, 605],
    "Horseback riding, walking": [148, 177, 207, 236],
    "Horseshoe pitching": [177, 211, 246, 281],
    "Housework, light": [148, 177, 207, 236],
    "Housework, moderate": [207, 246, 286, 325],
    "Housework, vigorous": [236, 281, 327, 372],
    "Hunting, general": [295, 354, 413, 472],
    "Hunting, large game": [354, 422, 490, 559],
    "Hunting, small game": [295, 354, 413, 472],
    "Ice skating, < 9 mph": [325, 387, 448, 510],
    "Ice skating, average speed": [413, 493, 572, 651],
    "Ice skating, rapidly": [531, 633, 735, 837],
    "Instructing aerobics class": [354, 422, 490, 559],
    "Jai alai": [708, 844, 981, 1117],
    "Jazzercise": [354, 422, 490, 559],
    "Judo, karate, jujitsu, martial arts": [590, 702, 813, 925],
    "Juggling": [236, 281, 327, 372],
    "Jumping rope, fast": [708, 844, 981, 1117],
    "Jumping rope, moderate": [590, 702, 813, 925],
    "Jumping rope, slow": [472, 562, 651, 741],
    "Kayaking": [295, 354, 413, 472],
    "Kick boxing": [590, 702, 813, 925],
    "Kickball": [413, 493, 572, 651],
    "Krav maga class": [590, 702, 813, 925],
    "Lacrosse": [472, 562, 651, 741],
    "Loading, unloading car": [177, 211, 246, 281],
    "Machine tooling, sheet metal": [148, 177, 207, 236],
    "Machine tooling, tapping, drilling": [236, 281, 327, 372],
    "Marching band, playing instrument": [236, 281, 327, 372],
    "Marching, rapidly, military": [384, 457, 531, 605],
    "Masonry, concrete": [413, 493, 572, 651],
    "Masseur, masseuse, standing": [236, 281, 327, 372],
    "Mild stretching": [148, 177, 207, 236],
    "Moving heavy objects, moving van": [443, 529, 615, 701],
    "Mowing lawn, riding mower": [148, 177, 207, 236],
    "Mowing lawn, walk, power mower": [325, 387, 448, 510],
    "Music, playing a cello": [118, 141, 165, 189],
    "Music, playing drums": [236, 281, 327, 372],
    "Music, playing guitar": [177, 211, 246, 281],
    "Music, playing piano": [148, 177, 207, 236],
    "Music, playing trombone": [207, 246, 286, 325],
    "Music, playing trumpet": [148, 177, 207, 236],
    "Music, playing violin": [148, 177, 207, 236],
    "Nursing, patient care": [177, 211, 246, 281],
    "Orienteering": [531, 633, 735, 837],
    "Paddle boat": [236, 281, 327, 372],
    "Paddleball, competitive": [590, 702, 813, 925],
    // "P ...
    "Rowing machine, vigorous": [502, 598, 695, 791],
    "Rugby": [590, 702, 813, 925],
    "Running, 5 mph (12 min/mile)": [472, 562, 651, 741],
    "Running, 5.2 mph (11.5 min/mile)": [531, 633, 735, 837],
    "Running, 6 mph (10 min/mile)": [590, 702, 813, 925],
    "Running, 6.7 mph (9 min/mile)": [649, 773, 897, 1021],
    "Running, 7.5mph (8 min/mile)": [738, 879, 1021, 1162],
    "Running, 8 mph (7.5 min/mile)": [826, 985, 1144, 1303],
    "Running, 8.6 mph (7 min/mile)": [944, 1125, 1306, 1487],
    "Running, 9 mph (6.5 min/mile)": [1062, 1267, 1471, 1675],
    "Running, 10 mph (6 min/mile)": [1181, 1408, 1635, 1862],
    "Running, 10.9 mph (5.5 min/mile)": [1290, 1537, 1785, 2032],
    "Running, cross country": [590, 702, 813, 925],
    "Running, general": [472, 562, 651, 741],
    "Running, on a track, team practice": [472, 562, 651, 741],
    "Sailing, competition, racing": [236, 281, 327, 372],
    "Sailing, yachting, ocean sailing": [177, 211, 246, 281],
    "Scrubbing floors": [354, 422, 490, 559],
    "Scuba or skin diving": [472, 562, 651, 741],
    "Shoveling snow, by hand": [590, 702, 813, 925],
    "Shuffleboard": [177, 211, 246, 281],
    "Sitting activities, light effort": [88, 105, 123, 140],
    "Sitting activities, moderate effort": [118, 141, 165, 189],
    "Sitting, watching TV": [59, 70, 82, 94],
    "Skateboarding": [354, 422, 490, 559],
    "Ski jumping, climbing up hill": [472, 562, 651, 741],
    "Ski machine": [472, 562, 651, 741],
    "Skiing, downhill": [413, 493, 572, 651],
    "Skiing, cross-country": [590, 702, 813, 925],
    "Skiing, water skiing": [472, 562, 651, 741],
    "Skiing, cross-country, racing": [826, 985, 1144, 1303],
    "Skiing, cross-country, uphill": [944, 1125, 1306, 1487],
    "Skiing, water skiing, general": [354, 422, 490, 559],
    "Skiing, jet skiing, driving, in water": [354, 422, 490, 559],
    "Skiing, slalom water skiing": [472, 562, 651, 741],
    "Sledding, tobogganing, bobsledding": [354, 422, 490, 559],
    "Sleeping": [59, 70, 82, 94],
    "Snorkeling": [295, 354, 413, 472],
    "Soccer, casual, general": [413, 493, 572, 651],
    "Soccer, competitive": [590, 702, 813, 925],
    "Softball or baseball": [354, 422, 490, 559],
    "Softball, officiating": [207, 246, 286, 325],
    "Softball, pitching": [472, 562, 651, 741],
    "Sports spectator": [118, 141, 165, 189],
    "Squash": [708, 844, 981, 1117],
    "Stair machine": [590, 702, 813, 925],
    "Standing activities, light effort": [118, 141, 165, 189],
    "Standing activities, moderate effort": [177, 211, 246, 281],
    "Steam cleaning carpets": [413, 493, 572, 651],
    "Stretching, hatha yoga": [177, 211, 246, 281],
    "Surfing, body or board": [207, 246, 286, 325],
    "Swimming, backstroke": [590, 702, 813, 925],
    "Swimming, breaststroke": [590, 702, 813, 925],
    "Swimming, butterfly": [649, 773, 897, 1021],
    "Swimming, crawl": [590, 702, 813, 925],
    "Swimming, leisurely": [413, 493, 572, 651],
    "Swimming, sidestroke": [472, 562, 651, 741],
    "Swimming, synchronized": [472, 562, 651, 741],
    "Swimming, treading water, fast, vigorous effort": [708, 844, 981, 1117],
    "Swimming, treading water, moderate effort": [354, 422, 490, 559],
    "Table tennis, ping pong": [236, 281, 327, 372],
    "Tai chi": [236, 281, 327, 372],
    "Teaching aerobics": [413, 493, 572, 651],
    "Team sports, general": [472, 562, 651, 741],
    "Tennis, doubles": [354, 422, 490, 559],
    "Tennis, general": [472, 562, 651, 741],
    "Tennis, singles": [590, 702, 813, 925],
    "Touch football": [472, 562, 651, 741],
    "Treadmill, general": [413, 493, 572, 651],
    "Vacuuming": [207, 246, 286, 325],
    "Volleyball, competitive, in gymnasium": [472, 562, 651, 741],
    "Volleyball, non-competitive, 6-9 member team": [236, 281, 327, 372],
    "Volleyball, beach": [472, 562, 651, 741],
    "Walking, 2.0 mph, slow": [177, 211, 246, 281],
    "Walking, 2.5 mph": [207, 246, 286, 325],
    // "W ...


};


export default CalorieBurnData