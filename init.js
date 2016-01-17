(elevators, floors) => {
    "use strict";
    var data = {};
    var print = (text, data) => {
            console.log(text, data);
            return data;
        }
        //TODO: Merge queues into one but store if up or down or both buttons were pressed
        // Optimize: When no one is in the lift and floor first 3 and then 4 want to go down, go to 4 and go down instead of 3
        //TODO: Startr when queues get filled and not only when a person enters the elvator on lvl 0

    var floorUpQueue = //import('queue.js');
        var floorDownQueue = //import('queue.js');

            let setIndicators = (elevator) => {
                let stopped = elevator.destinationDirection() === 'stopped';
                let up = elevator.destinationDirection() === 'up';
                let down = elevator.destinationDirection() === 'down'
                if (stopped) {
                    if (elevator.destinationQueue.length > 0) {
                        up = elevator.destinationQueue[0] > elevator.currentFloor();
                        down = !up;
                    } else {
                        up = true;
                        down = true;
                    }
                }
                elevator.goingUpIndicator(up);
                elevator.goingDownIndicator(down);
            }
    elevators.forEach(elevator => {
        elevator.goingUpIndicator(true);
        elevator.goingDownIndicator(false);
        elevator.on("idle", () => {
            if (elevator.getPressedFloors().length > 0) {
                elevator.goToFloor(Math.max.apply(null, elevator.getPressedFloors()));
                setIndicators(elevator);
            } else if (floorUpQueue.length() > 0) {
                elevator.goToFloor(print("going to floor", floorUpQueue.next()));
                setIndicators(elevator);
            } else if (floorDownQueue.length() > 0) {
                elevator.goToFloor(print("going to floor", floorDownQueue.next()));
                setIndicators(elevator);
            } else {
                console.log('elevator idle, both queues are empty - up:' + floorUpQueue.length() + 'down: ' + floorDownQueue.length())
            }
        })
        elevator.on("floor_button_pressed", num => {

            //elevator.goToFloor(num);
        });
        elevator.on("stopped_at_floor", num => {
            setIndicators(elevator);
        });
        elevator.on("passing_floor", num => {
            console.group()
            console.log('passing floor', num);
            let checkfloor = (queue, name) => {
                if (queue.has(num)) {
                    console.log('stopping because floor button', name);
                    queue.remove(num);
                    elevator.goToFloor(num, true);
                }
            }
            if (elevator.loadFactor() > 0.85) {
                console.log('not stopping, elevator too full');
                console.groupEnd();
            } else {
                if (elevator.getPressedFloors().indexOf(num) !== -1) {
                    console.log('stopping because pressed');
                    elevator.goToFloor(num, true);
                }
                let direction = elevator.destinationDirection();
                if (direction === 'up') {
                    checkfloor(floorUpQueue, direction);
                } else if (direction === 'down') {
                    checkfloor(floorDownQueue, direction);
                }
                console.groupEnd();
            }
        });
    });

    floors.forEach(floor => {
        floor.on("up_button_pressed ", () => {
            console.log('up button pressed', floor.floorNum())
            floorUpQueue.push(floor.floorNum())
        });
        floor.on("down_button_pressed  ", () => {
            console.log('down button pressed', floor.floorNum())
            floorDownQueue.push(floor.floorNum())
        });
    });
}
