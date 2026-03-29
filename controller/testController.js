const services = require('../services/test')

const test = async(req,res) => {
    
    try {
        const result = await services.test();
        let warnings = null;

        if(result.warnings) {
            warnings = result.warnings && result.warnings.trim() !== '' ? result.warnings : null
        }

        res.status(200).json({
            message: 'Command executed successfully',
            data: result.data,
            warnings
        });

    } catch (err) {
        res.status(500).json({
            message: 'Execution failed',
            error: err.message
        });
    }


}

const test1 = (async(req,res) => {
    try {
        const result = await services.test1()
        
        res.status(200).json({
            output: result.stdout,
            errors: result.stderr,
            exitCode: result.code
        })
    }catch(error) {
        res.status(500).json({error: error.message})
    }

})

const test2 = (async(req,res) => {
    try {
    const result = await services.test2()
        res.status(200).json({result})
    }catch(error) {
        res.status(500).json({error: error.message})
    }

})

const test3 = (async(req,res) => {
    try {
        const output = await services.test3()
        let warnings = null
        if(output.warnings) {
            warnings = output.warnings && output.warnings.trim() !== "" ? output.warnings: null
        }
        res.status(200).json({
            data: output.data,
            warnings
        })


    } catch(error) {
        res.status(500).json({error: error.message})
    }
})


module.exports = {
    test,
    test1,
    test2,
    test3
}