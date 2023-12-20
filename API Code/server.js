const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Functions = require('./API-Functions.js');

// Specify the port and express(Express framework for Node.js)
const port = 5000;
const app = express();

// Middleware for parching JSON requests
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware to handle CORS
app.use(function (req, res, next) {
	const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000','http://localhost:8081', 'http://10.0.2.2:3000', 'http://10.0.2.2:8081'];
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
	  res.setHeader('Access-Control-Allow-Origin', origin);
	}

	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');

	// Allow credentials
	res.setHeader('Access-Control-Allow-Credentials', 'true');

	next();
  });


// Middleware function to verify JWT tokens and attach the user object to the request
const verifyJWT = async (req, res, next) => {
	try {
	  const token = req.cookies['jwt-token'];

	  if (!token) {
		return res.status(401).json({ error: 'Unauthorized' });
	  }

	  const decoded = await jwt.verify(token, 'thisisaverysecretkeyspongebob');

	  // Attach user information to the request
	  req.user = decoded;

	  next();
	} catch (error) {
	  console.error('Authentication error:', error);

	  if (error.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'Invalid token' });
	  }

	  // Handle other errors
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  };


// API endpoints to test the API

// Using inspect element in the browser, you can see the JSON response and error messages (right click -> inspect -> console)

// GET endpoint to test if the API is running
app.get('/api/hello', verifyJWT, (req, res) => {
	res.status(200).json({ message: 'Hello World!' });
});

// GET endpoint to get all the user data and send it back to the client, for testing purposes!!!
app.get('/api/employee/allemployees', async (req, res) => {
	try {
		const userData = await Functions.getAllEmployeeData();
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'i did an oopsie' });
	}
});

app.get('/api/company/allcompanies', async (req, res) => {
	try {
		const userData = await Functions.getAllCompanies();
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'i did an oopsie' });
	}
});

// endpoint
app.post('/api/employee/company', async (req, res) => {
    try {
        const { company_id } = req.body; // Extract company_id from query parameters
        const userData = await Functions.getAllEmployeeDataByCompany(company_id);
        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'i did an oopsie' });
    }
});


// Deze endpoint verwacht de Admin First Name, Admin Last name, Admin Email en Company Name van nieuwe employee
app.post('/api/company/add', async (req, res) => {
	try {
		const { first_name, last_name, email, company_name } = req.body;
		const userData = await Functions.createNewCompany(first_name, last_name, email, company_name);
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'i did an oopsie' });
	}
});

// Deze endpoint verwacht alleen de Company ID van wie je hem wilt verwijderen
app.delete('/api/company/delete', async (req, res) => {
	try {
		const { company_id } = req.body;
		const userData = await Functions.deleteCompany(company_id);
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'i did an oopsie' });
	}
});

// Deze endpoint verwacht de companyID, First Name, Last name en Email van nieuwe employee
app.post('/api/employee/add', async (req, res) => {
	try {
		const { comp_id, first_name, last_name, email } = req.body;
		const userData = await Functions.createNewEmployee(comp_id, first_name, last_name, email);
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'i did an oopsie' });
	}
});

// Deze endpoint verwacht alleen de Employee ID van wie je hem wilt verwijderen
app.delete('/api/employee/delete', async (req, res) => {
	try {
		const { employee_id } = req.body;
		const userData = await Functions.deleteEmployee(employee_id);
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'i did an oopsie' });
	}
});

app.post('/api/employee/schedule', async (req, res) => {
	try {
	  const { id, week } = req.body;
	  const userData = await Functions.getEmployeeSchedule(id, week);
	  res.status(200).json(userData);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'i did an oopsie' });
	}
  });

app.post('/api/employee/schedule/create', async (req, res) => {
	try {
		const { id, week } = req.body;
		const insertResult = await Functions.createEmployeeSchedule(id, week);
		res.status(200).json(insertResult);
		// if (insertResult) {
		//   res.status(200).json({ message: 'Schedule inserted successfully' });
		// } else {
		//   res.status(500).json({ error: 'Failed to insert schedule' });
		// }
	  } catch (error) {
		console.error(error);
		res.status(500).json({ error: 'wah wah Internal server error' });
	  }
});

app.put('/api/employee/schedule/update', async (req, res) => {
	try {
		const { schedule_id, m, tu, w, th, f, sa, su } = req.body;
		const updateResult = await Functions.updateEmployeeSchedule(schedule_id, m, tu, w, th, f, sa, su);

		if (updateResult)
		{
		  res.status(200).json({ message: 'Schedule updated successfully' });
		} else {
		  res.status(500).json({ error: 'Failed to updated schedule' });
		}
	  } catch (error) {
		console.error(error);
		res.status(500).json({ error: 'wah wah Internal server error' });
	  }
});

app.put('/api/employee/rememberschedule/update', async (req, res) => {
	try {
		const { employee_id, keep_schedule } = req.body;
		const updateResult = await Functions.updateEmployeeRememberSchedule(employee_id, keep_schedule);

		if (updateResult)
		{
		  res.status(200).json({ message: 'Remember schedule updated successfully' });
		} else {
		  res.status(500).json({ error: 'Failed to update remember schedule' });
		}
	  } catch (error) {
		console.error(error);
		res.status(500).json({ error: 'wah wah Internal server error' });
	  }
});


// Endpoint for checking authentication
app.get('/api/auth', verifyJWT, (req, res) => {
	res.status(200).json({ message: 'Authenticated', userData: req.user });
});


// API endpoints for the actual application
app.post('/api/employee/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const userData = await Functions.getSingleEmployeeByEmailData(email, password);
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred getting the employee' });
	}
});

app.post('/api/employee/forgot_password', async (req, res) => {
	try {
		const { email} = req.body;
		const userData = await Functions.getSingleEmployeeByEmailData(email);
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred getting the employee' });
	}
});

app.post('/api/employee/change_password', async (req, res) => {
	try {
	  const { newPassword, email } = req.body;
	  const result = await Functions.ChangePasswordEmployee(newPassword, email);
	  if (result) {
		res.status(200).json({ message: 'Password changed successfully' });
	  } else {
		res.status(400).json({ error: 'Failed to change password' });
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'An error occurred while changing the password' });
	}
  });

// POST endpoint to login, get the admin data and send it back to the client
app.post('/api/CompanyAdmin/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const userData = await Functions.getSingleCompanyAdminData(email, password);

		if (!userData) {
			res.status(401).json({ error: 'Invalid email or password' });
			return;
		  }

		// Generate an access token using JWT (JSON Web Token)
		const token = jwt.sign(
			{
				userId: userData.id,
				firstName: userData.admin_first_name,
				lastName: userData.admin_last_name,
				userEmail: userData.email,
				full_schedule: userData.full_schedule,
				userRole: "CompanyAdmin",
				companyName: userData.company_name
			},
			'thisisaverysecretkeyspongebob',
			{ expiresIn: '2h' }
		);

		// Set the access token as a cookie (HTTP-only)
		res.cookie('jwt-token', token, { maxAge: 2 * 60 * 60 * 1000 }); // 2 hours max age

		res.status(200).json({ token: token, userData: jwt.decode(token) });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred getting the employee' });
	}
});

// POST endpoint to login, get the super admin data and send it back to the client
app.post('/api/SuperAdmin/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const userData = await Functions.getSingleSuperAdminData(email, password);

		if (!userData) {
			res.status(401).json({ error: 'Invalid email or password' });
			return;
		  }

		// Generate an access token using JWT (JSON Web Token)
		const token = jwt.sign(
			{
				userId: userData.id,
				firstName: userData.first_name,
				lastName: userData.last_name,
				userEmail: userData.email,
				userRole: "SuperAdmin",
				companyName: userData.company_name
			},
			'thisisaverysecretkeyspongebob',
			{ expiresIn: '2h' }
		);

		// Set the access token as a cookie (HTTP-only)
		res.cookie('jwt-token', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }); // 2 hours max age

		res.status(200).json({ token: token, userData: jwt.decode(token)});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred getting the employee' });
	}
});

// POST endpoint to register a new user
app.post('/api/employee/register', async (req, res) => {
	try {
		const { First_Name, Last_Name, Email, Password, KeepSchedule } = req.body;
		const userData = await Functions.registerEmployee(First_Name, Last_Name, Email, Password, KeepSchedule);
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred adding an employee to the database' });
	}
});

// POST endpoint to retrieve attendance of all employees
app.post('/api/employees/attendance', async (req, res) => {
    try {
        const { comp_id, week_number } = req.body;
        const userData = await Functions.getAttendance( comp_id, week_number );
        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred retrieving employee attendance from the database' });
    }
})

app.post('/api/forgot_password', async (req, res) => {
	try {
	  const { email } = req.body;
  
	  // Assuming you have a function to check if an email exists, replace 'checkEmailExists' with the appropriate function
	  console.log('Received request with email:', email);
	  const emailExists = await Functions.checkEmailExists(email);
  
	  if (emailExists) {
		res.status(200).json({ success: true });
	  } else {
		console.log('HELPPPPPPP')
		res.status(404).json({ error: 'Email not found in the database' });
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'An error occurred while processing forgot password request' });
	}
  });

  app.post('/api/change_password', async (req, res) => {
	try {
	  let { newPassword, token } = req.body;

	  token = jwt.decode(token);

	  const result = await Functions.ChangeAdminPassword(newPassword, token.email);
	  if (result) {
		res.status(200).json({ message: 'Password changed successfully' });
	  } else {
		res.status(400).json({ error: 'Failed to change password' });
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'An error occurred while changing the password' });
	}
  });

  
app.get('/api/admin/singleadmin', async (req, res) => {
	try {
	  const { email, password } = req.query;
  
	  if (!email) {
		return res.status(400).json({ error: 'Admin email is required' });
	  }
  
	  const adminData = await getSingleCompanyAdminDataByEmail(email, password);
  
	  if (!adminData) {
		return res.status(404).json({ error: 'Admin not found' });
	  }
  
	  res.status(200).json(adminData);
	} catch (error) {
	  console.error('Error in /api/admin/singleadmin endpoint:', error);
	  res.status(500).json({ error: 'Internal server error' });
	}
  });

app.get('/api/SuperAdmin/singlesuperadmin', async (req, res) => {
	try {
		const { email, password} = req.query;
	
		if (!email) {
		  return res.status(400).json({ error: 'SuperAdmin email is required' });
		}
	
		const adminData = await getSingleSuperAdminData(email, password);
	
		if (!adminData) {
		  return res.status(404).json({ error: 'SuperAdmin not found' });
		}
	
		res.status(200).json(adminData);
	  } catch (error) {
		console.error('Error in /api/admin/singleadmin endpoint:', error);
		res.status(500).json({ error: 'Internal server error' });
	  }
  })

app.post('/api/admin/registerAdmin', async (req, res) => {
	try {
        const { admin_first_name, admin_last_name, company_name, full_schedule, email, password } = req.body;
        const success = await Functions.createNewCompany(admin_first_name, admin_last_name, company_name, full_schedule, email, password);
        if (success) {
            res.status(200).json({ message: 'Admin registration successful' });
        } else {
            res.status(500).json({ error: 'An error occurred registering the admin' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred registering the admin' });
    }
})

app.post('/api/admin/updateAdmin', async (req, res) => {
	try {
	  const { adminId, admin_first_name, admin_last_name, company_name, full_schedule, email, password } = req.body;
  
	  // Retrieve the existing admin information from the database
	  const existingAdmin = await Functions.getCompanyAdminById(adminId);
  
	  if (!existingAdmin) {
		return res.status(404).json({ error: 'Admin not found' });
	  }
  
	  // Update only the fields that are provided in the request body
	  if (admin_first_name) {
		existingAdmin.admin_first_name = admin_first_name;
	  }
	  if (admin_last_name) {
		existingAdmin.admin_last_name = admin_last_name;
	  }
	  if (company_name) {
		existingAdmin.company_name = company_name;
	  }
	  if (full_schedule !== undefined) {
		existingAdmin.full_schedule = full_schedule;
	  }
	  if (email) {
		existingAdmin.email = email;
	  }
	  if (password) {
		existingAdmin.password = password;
	  }
  
	  // Save the updated admin information to the database
	  const success = await Functions.updateAdmin(adminId, existingAdmin);
  
	  if (success) {
		res.status(200).json({ message: 'Admin information updated successfully' });
	  } else {
		res.status(500).json({ error: 'An error occurred updating the admin information' });
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'An error occurred updating the admin information' });
	}
  });
  
app.post('/api/logout', (req, res) => {
	res.clearCookie('jwt-token');
	res.status(200).json({ message: 'Logged out successfully' });
});


// Starting the API server
app.listen(port, () => {
	console.log(`Server running on port: ${port}.`);
});

// Close the database connection when the Node process ends
process.on('exit', (code) => {
	pool.end(err => {
	  if (err) {
		console.error('Failed to close the pool:', err);
	  }
	  console.log(`About to exit with code: ${code}`);
	});
  });
