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

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import applications.mail.connection.IMAPStoreCache;
import applications.mail.domain.User;
import applications.mail.exception.InvalidAuthenticationException;
import applications.mail.exception.MailClientException;

public abstract class AbstractService {

	protected Logger logger = LogManager.getLogger(IMAPStoreCache.class);

	@Autowired
	protected LoginUserService loginUserService;

	protected User getUser(String userName, String password) throws MailClientException {

		// synchronized userName so if many threads get user concurrent then only one
		// thread execute login,
		// others thread wait and obtain user without login
		if (!StringUtils.isEmpty(userName)) {
			synchronized (userName) {
				User user = (User) loginUserService.getUserFromCache(userName);
				if (user == null) {
					try {
						loginUserService.login(userName, password, null);
						user = (User) loginUserService.getUserFromCache(userName);
						if (user != null) {
							return user;
						} else {
							throw new InvalidAuthenticationException(getClass().getSimpleName() + User.NOT_FOUND);
						}
					} catch (MessagingException e) {
						throw new InvalidAuthenticationException(e.getMessage().toString());
					} catch (RuntimeException e) {
						throw new InvalidAuthenticationException(getClass().getSimpleName() + User.NOT_FOUND);
					}

				} else {
					return user;
				}
			}
		}
		return null;
	}

}
