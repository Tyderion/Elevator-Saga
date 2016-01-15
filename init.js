(elevators, floors) => {
       var queue = //import("queue.js")
        elevators.forEach(elevator => {
            elevator.on("idle", () => {
                if (queue.length() > 0) {
                    elevator.goToFloor(queue.next());
                } else {
                    elevator.goToFloor(0);
                }
            });
            elevator.on("floor_button_pressed", num => queue.push(num));
        });
        floors.forEach(floor => {
            floor.on("up_button_pressed ", () => queue.push(floor.floorNum()));
            floor.on("down_button_pressed  ", () => queue.push(floor.floorNum()));
        })
    }
