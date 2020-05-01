import Router from 'koa-router'
import Redis from 'koa-redis'
import User from '../dbs/models/user'

const router = new Router({
    prefix: '/foc'
})

let Foc = new Redis().client

/*关注*/
router.post('/focs_push', async (ctx) => {
    const name = ctx.request.body.au_name

    if (ctx.isAuthenticated()) {

        let username = decodeURIComponent(ctx.session.passport.user.username)
        try {
            let one = await Foc.get(`${username}foc`)
            if (!one) {
                Foc.set(`${username}foc`, '>')
            }
            else { }

            const name_val = `>${name}`
            Foc.append(`${username}foc`, name_val)

            ctx.body = {
                code: 0
            }

        } catch (e) {
            ctx.body = {
                code: 1
            }
        }
    } else {
        ctx.body = {
            code: 2
        }
    }
})
/*取关*/
router.post("/focus_del", async (ctx) => {
    const name = ctx.request.body.au_name
    let username = decodeURIComponent(ctx.session.passport.user.username)
    try {
        let val = await Foc.get(`${username}foc`)//拿
        let focus_val = val.replace(`>${name}`, '')//换
        Foc.set(`${username}foc`, focus_val)

        ctx.body = {
            code: 0
        }

    } catch (e) {
        ctx.body = {
            code: 1
        }
    }
})
router.get('/deltest',async(ctx)=>{
    let username = decodeURIComponent(ctx.session.passport.user.username)
    let val = await Foc.get(`${username}foc`)
    let focus_val = val.replace(`>打怪班长`, '')//换
    Foc.set(`${username}foc`, focus_val)

    let val_end = await Foc.get(`${username}foc`)
    //Foc.del(`饼干大人foc`)

    //let focc = Foc.get('饼干大人foc')
    ctx.body={
        code:"5",
        foc:val_end
    }

})

/*是否已经关注*/
router.get('/had', async (ctx) => {

    if (ctx.isAuthenticated()) {
        const name = ctx.query.au_name
        let username = decodeURIComponent(ctx.session.passport.user.username)
        let focs = await Foc.get(`${username}foc`)

        if (!focs) {
            Foc.set(`${username}foc`, `>`)
            focs = '>>>>'
        }
        try {
            let val = focs.indexOf(name)//找
            if (val > 0) {
                ctx.body = {
                    code: 0
                }
            } else {
                ctx.body = {
                    code: 1
                }
            }


        } catch (e) {
            ctx.body = {
                code: 2,
                ot_error: e
            }
        }
    }
    else {
        ctx.body = {
            code: 2,
        }
    }
})



/*关注的人*/
router.get('/getfocus', async (ctx) => {
    let username = ctx.query.user

    try {
        const test = await Foc.get(`${username}foc`)

        if (test.length > 3) {
            const name = test.slice(2).split(">")
            let focs = []

            for (let i = 0; i < name.length; i++) {
                let focs_val = await User.findOne({
                  username: encodeURIComponent(name[i])
                })
                focs.push(focs_val)
            }
            
            focs = focs.map(item=>{
                return {
                    username:decodeURIComponent(item.username),
                    auhead:item.auhead,
                    id:item.userid
                }
            })

            ctx.body = {
                code: 0,
                focs
            }
        }
        else {
            ctx.body = {
                code: 1,
                focs: []
            }
        }


    } catch (e) {
        ctx.body = {
            code: -1,
            focs: e
        }
    }
})


export default router
