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
import org.springframework.stereotype.Service;

import com.sun.mail.imap.IMAPFolder;
import com.sun.mail.imap.IMAPStore;

import applications.mail.connection.IMAPStoreCache;
import applications.mail.domain.User;
import applications.mail.exception.MailClientException;
import applications.mail.exception.InvalidAuthenticationException;

@Service
public class FetchMessagesServiceImpl extends AbstractService implements FetchMessagesService {

	 protected Logger logger = LogManager.getLogger(FetchMessagesServiceImpl.class);
	
	@Autowired
	protected IMAPStoreCache cache;

	public int getUnseenMessage(String foldeName, String userName, String password) throws MailClientException {
		int result = -1;
		IMAPFolder f = null;
		User user = null;
		try {
			try {
				user = getUser(userName, password);
			} catch (InvalidAuthenticationException e) {
				return result;
			}

			if (user != null && user.getAuthenticated()) {
				IMAPStore store = cache.get(user);
				f = (IMAPFolder) store.getFolder(foldeName);
				// check if the folder is open, if not open it read only
				if (f.isOpen() == false) {
					f.open(IMAPFolder.READ_ONLY);
				}

				// if the folder is empty we have no need to process
				result = f.getUnreadMessageCount();
			}
		} catch (MessagingException e) {
			e.printStackTrace();
			logger.info("Error getUnseenMessage in folder: " + foldeName);
		}
		finally {
			try {
				if(f != null && f.isOpen()) {
					f.close(false);					
				}
			} catch (MessagingException e) {
				e.printStackTrace();
				logger.info(e.getMessage());
			}
		}

		return result;
	}
}
