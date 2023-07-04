class  MyCron {
    status = false
    callback () {

    }

    /**
     *
     * @return {void}
     */
   async run(){
        if(this.status === true) return
       this.status =true
        await  this.callback()
       this.status =false
    }
}

export {MyCron}
