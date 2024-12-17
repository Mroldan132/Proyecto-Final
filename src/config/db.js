import mongoose from 'mongoose'

const conectarDB = async () => {

        try{
            await mongoose.connect('mongodb://127.0.0.1:27017/tagliatore', {
            })
            console.log('DB conectada')
        }
        catch(error){
            console.log(error)
            process.exit(1)
        }
        

}

export default conectarDB