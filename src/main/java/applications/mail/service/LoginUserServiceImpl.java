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

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.mail.MessagingException;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import applications.mail.connection.IMAPStoreCache;
import applications.mail.domain.Settings;
import applications.mail.domain.User;
import applications.mail.domain.UserImpl;
import applications.mail.exception.MailClientException;
import applications.mail.util.SettingsDiscoverer;

@Service
public class LoginUserServiceImpl implements LoginUserService {
	
	protected Logger logger = LogManager.getLogger(LoginUserServiceImpl.class);
	
	private static final int MAX_ENTRIES_USER = 100;

	@Autowired
	private SettingsDiscoverer settingsDiscoverer;

	@Autowired
	private Settings defaultSetting;
	
	@Autowired
    protected IMAPStoreCache cache;
	
	private final Map<String, User> userCache = Collections.synchronizedMap(new LinkedHashMap<String,User>(){
		private static final long serialVersionUID = 1L;

			@Override
	        protected boolean removeEldestEntry(Map.Entry<String,User> eldest) {
	        	return size() > MAX_ENTRIES_USER;
	        }
	});
	
	public User login(String username, String password, Settings settings) throws MailClientException, MessagingException {
		logger.debug("Login user: " + username + " " + password);
		try {
			User user = new UserImpl();
			user.setName(username);
			user.setPassword(password);
			user.setSettings(fix(settings));
			cache.get(user);
			user.setAuthenticated(true);
			putUserToCache(username, user);
			settingsDiscoverer.setValidSettings(user);
			return user;
		} catch (Exception e) {
			if (e instanceof MessagingException) {
				throw e;
			}
			else {
				throw new RuntimeException(e);				
			}
		}
	}

	private Settings fix(Settings a) {
		if (a == null) {
			return defaultSetting;
		}
		a.setImapServer(or(a.getImapServer(), defaultSetting.getImapServer()));
		a.setImapPort(or(a.getImapPort(), defaultSetting.getImapPort()));
		a.setSmtpServer((or(a.getSmtpServer(), defaultSetting.getSmtpServer())));
		a.setSmtpPort(or(a.getSmtpPort(), defaultSetting.getSmtpPort()));

		a.setInboxFolderName(or(a.getInboxFolderName(), defaultSetting.getInboxFolderName()));
		a.setSentFolderName(or(a.getSentFolderName(), defaultSetting.getSentFolderName()));
		a.setTrashFolderName(or(a.getTrashFolderName(), defaultSetting.getTrashFolderName()));
		a.setDraftsFolderName(or(a.getDraftsFolderName(), defaultSetting.getDraftsFolderName()));
		
		a.setImapSecure(or(a.getImapSecure(), defaultSetting.getImapSecure()));
		a.setSmtpSecure(or(a.getSmtpSecure(), defaultSetting.getSmtpSecure()));
		return a;
	}

	private <T> T or(T a, T b) {
		return a == null ? b : a;
	}

	@Override
	public Settings getSettings(String email) {
		if (settingsDiscoverer == null) {
			settingsDiscoverer = new SettingsDiscoverer();
		}
		return settingsDiscoverer.discoverSettings(email);
	}

	public User getUserFromCache(String userName) {
		return userCache.get(userName);
	}
	
	public void putUserToCache(String userName, User user) {
		userCache.put(userName, user);
	}
	

}
