---
title: Credits
permalink: /docs/credits/
layout: default
---

# Credits

We rely mostly on publically available data and open source software in order to bring you this service. This website is built around a "[serverless](https://en.wikipedia.org/wiki/Serverless_computing)" approach and runs smoothly on [Amazon Web Services](https://aws.amazon.com/) and [Github Pages](https://pages.github.com/).

## Data

Futures contracts daily settlement prices, volumes and open interest come from publically available data sources and mostly from [Quandl](https://www.quandl.com).

## Backend

The backend is written mostly in Python but also in Javascript (Node.js) for some services.
The Python backend runs on [AWS Lambda](https://aws.amazon.com/lambda/?nc1=h_ls) and is deployed with [Zappa](https://github.com/Miserlou/Zappa).

We use the following services from [AWS](https://aws.amazon.com): Cloudfront, Lambda, S3, API Gateway, RDS, DynamoDB, Cognito, IAM, SQS, IOT, Codepipeline, Codebuild and Cloudwatch.

We use the following open source frameworks and libraries and are grateful to their authors and contributors:
* [Zappa](https://github.com/Miserlou/Zappa)
* [Flask](http://flask.pocoo.org/)
* [Pandas](https://pandas.pydata.org/)
* [Numpy]( http://www.numpy.org/)
* [SQLAlchemy]( https://www.sqlalchemy.org/)
* [Marshmallow]( https://marshmallow.readthedocs.io/)
* [Pytest]( https://pytest.org/)

## Frontend

The frontend (this website) is built with [React](https://reactjs.org/) and [Jekyll](https://jekyllrb.com/), hosted on [AWS S3](https://aws.amazon.com/s3/) and [Github Pages](https://pages.github.com/) and served through [AWS Cloudfront](https://aws.amazon.com/cloudfront/).

We use the following open source frameworks and libraries and are grateful to their authors and contributors:
* [React](https://reactjs.org/)
* [Create-React-App](https://facebook.github.io/create-react-app/)
* [React-Redux](https://react-redux.js.org/)
* [React-Router](https://reacttraining.com/react-router/web)
* [Redux-Saga](https://redux-saga.js.org/)
* [React-Bootstrap](https://react-bootstrap.github.io/)
* [Dataframe-js](https://github.com/Gmousse/dataframe-js)
* [Simple-Statistics](https://simplestatistics.org/)
* [XLSX](https://github.com/SheetJS/js-xlsx)
