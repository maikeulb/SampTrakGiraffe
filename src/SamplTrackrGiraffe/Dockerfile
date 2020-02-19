FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-bionic
COPY /bin/Release/netcoreapp3.1/publish /app
WORKDIR /app

#EXPOSE 12345


ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
ENV LANG en_GB.UTF-8
ENV LANGUAGE en_GB:en
ENV LC_ALL en_GB.UTF-8
ENV TZ=Europe/London
#RUN apk add --no-cache icu-libs && apk add libgdiplus-dev --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ --allow-untrusted
RUN apt-get update && apt-get install -y libicu-dev  && apt-get install -y libgdiplus
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENTRYPOINT [ "dotnet", "SamplTrackrGiraffe.dll" ]