import asyncHandler from 'express-async-handler'; 
import User from '../models/User.js'; 


const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find().sort('-created_at').lean(); 
    if (!users?.length) return res.status(404).json({ message: "No users found!" });

	res.json({ data: users });
});

const createUser = asyncHandler(async (req, res) => {
    const { username, 
            first_name, 
            other_names, 
            last_name, 
            enterprise_name, 
            email, 
            phone, 
            password, 
            account_type } = req?.body; 

    const duplicateUsername = await User.findOne({ username: username }).lean(); 
    const duplicateEmail = await User.findOne({ email: email }).lean(); 

    if (duplicateUsername) {
        return res.status(409).json({ message: `Username ${duplicateUsername.username} already exists` });
    } else if (duplicateEmail) {
        return res.status(409).json({ message: `User email ${duplicateEmail.email} already exists` });
    }; 

    const emailVerifyToken = jwt.sign(
        { "username": username }, 
        process.env.EMAIL_VERIFY_TOKEN_SECRET, 
        { expiresIn: 20 * 60 }
    ); 

    let accountType;

    if (!account_type) {
        accountType = "individual";
    } else if (account_type && account_type == "individual") {
        accountType = "individual";
    } else if (account_type && account_type == "enterprise") {
        accountType = "enterprise";
    }; 

    const user = new User({
        user: req?.user_id, 
        username, 
        first_name, 
        other_names, 
        last_name, 
        enterprise_name, 
        email, 
        phone, 
        password, 
        role: accountType,
        email_verify_token: emailVerifyToken, 
        email_verified: new Date().toISOString()
    }); 

    user.save()
        .then(() => {
            res.status(201).json({ success: `User ${user._id} added`, data: user });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        }); 

    (async function () {
        const mailSubject = "New Account Registration";

        const mailBody = registerEmailConfirmMailTemplate(user)
        await sendMail(process.env.EMAIL_ADDRESS, user.email, mailSubject, mailBody);
    })();
}); 

const getUser = asyncHandler(async (req, res) => { 
    const { id } = req?.params;
	const user = await User.findOne({ _id: id })
		.select(['-created_at', '-updated_at', '-deleted_at'])
		.lean();

	if (!user) return res.status(404).json({ message: `No user matches user ${id}!` });
	res.status(200).json({ data: user });
}); 

const updateUser = asyncHandler(async (req, res) => {
    const { username, 
            first_name, 
            other_names, 
            last_name, 
            enterprise_name, 
            email, 
            phone, 
            password, 
            account_type } = req?.body; 

    const { id } = req?.params; 

    const user = await User.findOne({ _id: id }).exec();
    if (!user) return res.status(404).json({ message: "User not found!" }); 

    let accountType;

    if (!account_type) {
        accountType = "individual";
    } else if (account_type && account_type == "individual") {
        accountType = "individual";
    } else if (account_type && account_type == "enterprise") {
        accountType = "enterprise";
    }; 

    if (username) user.username = username; 
    if (first_name) user.first_name = first_name; 
    if (other_names) user.other_names = other_names; 
    if (last_name) user.last_name = last_name; 
    if (enterprise_name) user.enterprise_name = enterprise_name; 
    if (email) user.email = email; 
    if (phone) user.phone = phone; 
    if (password) user.password = password; 
    if (account_type) user.role = accountType; 

    user.save()
        .then(() => { 
			res.status(200).json({ success: `User record updated.`, data: user });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const user = await User.findOne({ _id: id }).exec();

    if (!user) return res.status(404).json({ message: `No user matches the user ${id}!` }); 

    if (user.deleted_at == '') {
        user.deleted_at = new Date().toISOString();
        user.deleted_by = req?.user_id;
    }

    user.save()
        .then(() => { 
			res.status(200).json({ success: `User record deleted.`, data: user });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const restoreUser = asyncHandler(async (req, res) => {
    const { id } = req?.params; 
    const user = await User.findOne({ _id: id }).exec();

    if (!user) return res.status(404).json({ message: `No user matches the user ${id}!` }); 

    if (user.deleted_at != '') {
        user.deleted_at = '';
        user.deleted_by = '';
    };

    user.save()
        .then(() => { 
			res.status(200).json({ success: `Deleted user record restored.`, data: user });
        })
        .catch((error) => {
            if (error) return res.status(400).json({ message: "An error occured!", details: `${error}` }); 
        });
}); 

const destroyUser = asyncHandler(async (req, res) => {
    const { id } = req?.params;
	const user = await User.findOne({ _id: id }).exec();

	if (!user) return res.status(404).json({ message: `No user matches the user ${id}!` }); 

	await user.deleteOne(); 

	res.status(200).json({ success: `User ${user?._id} has been permanently deleted.`, data: `${user}` });
}); 


export { getUsers, 
		createUser, 
		getUser, 
		updateUser, 
		deleteUser, 
        restoreUser, 
        destroyUser }; 