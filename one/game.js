
export class Game {
    #state
    #googlePosition
    #numberUtil
    #settings

    //dependency injection через конструктор
    constructor(numberUtil) {
        this.#state = GAME_STATUSES.PENDING
        this.#googlePosition = {x: 1, y: 1}
        this.#numberUtil =  numberUtil
        this.#settings = {
            gridSize: {
                columnsCount: 1,
                rowsCount: 2
            },
            jumpInterval: 100
        }
    }

    #jumpGoogle() {
        const newGooglePosition = {
            x: this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.columnsCount),
            y: this.#numberUtil.getRandomNumber(0, this.#settings.gridSize.rowsCount)
        }
        if(newGooglePosition.x === this.#googlePosition.x && newGooglePosition.y === this.#googlePosition.y) {
            this.#jumpGoogle()
        } else {
           this.#googlePosition = newGooglePosition
        }

    }


    async getStatus() {
        return this.#state
    }

    async getSetting() {
        return this.#settings
    }

    async start() {
        if (this.#state === GAME_STATUSES.PENDING) {
            this.#state = GAME_STATUSES.IN_PROGRESS
            setInterval(this.#jumpGoogle.bind(this), this.#settings.jumpInterval)
        }

        return this.#state;
    }


    async getGooglePosition() {
        return this.#googlePosition
    }

}


export const GAME_STATUSES = {
    PENDING: 'PENDING',
    IN_PROGRESS: "IN-PROGRESS",
    FINISHED: "FINISHED"
}