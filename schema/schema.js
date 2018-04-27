const graphql = require('graphql')
const _ = require('lodash')
const ContactForm = require('../models/ContactForm')
const Newsletter = require('../models/Newsletter')

const { GraphQLObjectType,
        GraphQLSchema,
        GraphQLString,
        GraphQLID,
        GraphQLList,
        GraphQLNonNull
    } = graphql ;

var contactsArray = [
    {firstname : 'Papasunnee', lastname : 'Adetona', email : 'papasunnee@gmail.com', service : 'Executive Coaching', country : 'Nigeria', companySize : '0-500', message : 'this is a demo message', id : '1'},
    {firstname : 'Amos', lastname : 'Audu', email : 'audu@gmail.com', service : 'Strategic Consulting', country : 'Nigeria', companySize : '500-1000', message : 'this is a demo message', id : '2'},
    {firstname : 'Moses', lastname : 'Ademola', email : 'ademola@gmail.com', service : 'Executive Search', country : 'Nigeria', companySize : '1000-10000', message : 'this is a demo message', id : '3'},
    {firstname : 'Emmanuel', lastname : 'Adams', email : 'adams@gmail.com', service : 'Executive Assessment', country : 'Nigeria', companySize : '10000-25000', message : 'this is a demo message', id : '4'},
]

var emails = [
    {email : 'papasunnee@gmail,com', id : '1'},
    {email : 'amos@gmail,com', id : '2'},
    {email : 'olabiyi@gmail,com', id : '3'},
    {email : 'akinola@gmail,com', id : '4'}
]

const ContactFormType = new GraphQLObjectType({
    name : 'ContactForm',
    fields : () => ({
        id : {type : GraphQLID},
        firstname : { type : GraphQLString},
        lastname : { type : GraphQLString},
        email : { type : GraphQLString},
        country : { type : GraphQLString},
        service : { type : GraphQLString},
        companySize : { type : GraphQLString},
        message : { type : GraphQLString}

    })
})

const NewsletterType = new GraphQLObjectType({
    name : 'Newsletter',
    fields : () => ({
        id : {type : GraphQLID},
        email : { type : GraphQLString},

    })
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields :  {
        contact : {
            type : ContactFormType,
            args : { id : { type : GraphQLID }},
            resolve(parent, args){
                //code to get data from db/other source
                //return _.find(contactsArray , {id : args.id}) ;
                return ContactForm.findById(args.id) ;
            }
        } ,
        contacts : {
            type : new GraphQLList(ContactFormType),
            resolve(parent, args){
                //code to get data from db/other source
                //return contactsArray ;
                return ContactForm.find({}) ;
            }
        } ,
        newsletter : {
            type : NewsletterType,
            args : { id : { type : GraphQLID }},
            resolve(parent, args){
                //code to get data from db/other source
                //return _.find(emails , {id : args.id}) ;
                return Newsletter.findById(args.id) ;
            }
        } ,
        newsletters : {
            type : new GraphQLList(NewsletterType),
            resolve(parent, args){
                return Newsletter.find({}) ;
            }
        } 
    }
})

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addContact : {
            type : ContactFormType,
            description : "Details filled from contact form",
            args : {
                firstname : { type : new GraphQLNonNull(GraphQLString)},
                lastname : { type : new GraphQLNonNull(GraphQLString)},
                email : { type : new GraphQLNonNull(GraphQLString)},
                service : { type : new GraphQLNonNull(GraphQLString)},
                country : { type : new GraphQLNonNull(GraphQLString)},
                companySize : { type : new GraphQLNonNull(GraphQLString)},
                message : { type : new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                let contactForm = new ContactForm({
                    firstname : args.firstname,
                    lastname : args.lastname,
                    email : args.email,
                    service : args.service,
                    country : args.country,
                    companySize : args.companySize,
                    message : args.message
                })
                return contactForm.save() ;
            }
        },
        addSubscribeEmail : {
            type : NewsletterType,
            description : "Subscribe To Newsletter Email",
            args : {
                email : { type : new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let newsletter = new Newsletter({
                    email : args.email
                })
                return newsletter.save() ;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})
