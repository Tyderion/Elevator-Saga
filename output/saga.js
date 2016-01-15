{
    init: (elevators, floors) => {
        var queue = function() {
            "use strict";
            var data = new Set();
            var push = ele => data.add(ele);
            var pop = () => {
                let value = data.values().next().value;
                data.delete(value);
                return value;
            }
            return {
                push: push,
                next: pop,
                length: () => data.size
            }
        }()

        elevators.forEach(elevator => {
            elevator.on("idle", () => {
                if (queue.length() > 0) {
                    elevator.goToFloor(queue.next());
                } else {
                    elevator.goToFloor(0);
                }
            });
            elevator.on("floor_button_pressed", num => elevator.goToFloor(num));
        });
        floors.forEach(floor => {
            floor.on("up_button_pressed ", () => queue.push(floor.floorNum()));
            floor.on("down_button_pressed  ", () => queue.push(floor.floorNum()));
        })
    }

    ,
    update: (deltaTime, elevators, floors) => {
        // We normally don't need to do anything here
    }
}