const getHistory = async () => {
    try {
        const res = await fetch('http://localhost:5000/history')
        if (res.ok) {
            const history = await res.json()
            return history
        } else {
            throw new Error('There is something wrong, cannot get your data!')
        }
    } catch (err) {
        console.log(err)
    }
}
export {getHistory}