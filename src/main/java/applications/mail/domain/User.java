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

package applications.mail.domain;

/**
 * User which will get used for login to the IMAP and SMTP account
 */
public interface User{
    public static final String NOT_FOUND = " <<<< User not found in session >>>> ID: ";

    String getId();
    boolean getAuthenticated();
    String getName();
    String getPassword();
    void setId(String string);
    void setName(String string);
    Settings getSettings();
    void setPassword(String password);
    void setAuthenticated(boolean b);
    void setSettings(Settings settings);
}
