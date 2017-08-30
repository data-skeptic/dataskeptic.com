/**
 * Created by ilya on 8/30/17.
 */
export const checkLogin = (email) => {
    let status = false;

    const email_reg_exp = /^.*@dataskeptic\.com/i;

    if(email_reg_exp.test(email)){
        status = true;
    }

    return {status};
}