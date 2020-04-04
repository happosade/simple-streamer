FROM docker:bionic
MAINTAINER CNB

ARG STREAM_IN_PORT
ARG STATIC_SERVE_PORT

RUN apt-get update
RUN apt-get install build-essential libpcre3 libpcre3-dev libssl-dev
RUN cd /tmp
RUN wget "http://nginx.org/download/nginx-1.17.3.tar.gz"
RUN wget "https://github.com/arut/nginx-rtmp-module/archive/v1.2.1.zip"
RUN wget "http://www.zlib.net/zlib-1.2.11.tar.gz"
RUN wget "https://bitbucket.org/nginx-goodies/nginx-sticky-module-ng/get/master.tar.gz"
RUN tar xvfz nginx-1.17.3.tar.gz
RUN unzip v1.2.1.zip
RUN tar xvfz zlib-1.2.11.tar.gz
RUN sudo tar xvfz master.tar.gz
RUN cd nginx-1.17.3
RUN ./configure --with-http_ssl_module --with-http_v2_module --with-http_auth_request_module --add-module=../nginx-rtmp-module-1.2.1 --add-module=../nginx-goodies-nginx-sticky-module-ng-08a395c66e42 --with-zlib=../zlib-1.2.11
RUN make
RUN make install



