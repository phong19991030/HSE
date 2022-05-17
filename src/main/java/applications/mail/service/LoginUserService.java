/****************************************************************
 * Licensed to the Apache Software Foundation (ASF) under one   *
 * or more contributor license agreements.  See the NOTICE file *
 * distributed with this work for aa2mional information        *
 * regarding copyright ownership.  The ASF licenses this file   *
 * to you under the Apache License, Version 2.0 (the            *
 * "License"); you may not use this file except in compliance   *
 * with the License.  You may obtain a copy of the License at   *
 *                                                              *
 *   http://www.apache.org/licenses/LICENSE-2.0                 *
 *                                                              *
 * Unless required by applicable law or agreed to in writing,   *
 * software distributed under the License is distributed on an  *
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY       *
 * KIND, either express or implied.  See the License for the    *
 * specific language governing permissions and limitations      *
 * under the License.                                           *
 ****************************************************************/

package applications.mail.service;

import javax.mail.MessagingException;

import applications.mail.domain.Settings;
import applications.mail.domain.User;
import applications.mail.exception.MailClientException;


public interface LoginUserService {
    User login(String username, String password, Settings settings) throws MailClientException, MessagingException;
    Settings getSettings(String email);
    

	public User getUserFromCache(String userName);
	public void putUserToCache(String userName, User user);
	
}
